
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import WorkflowVisualization from '@/components/WorkflowVisualization';
import WorkflowModal from '@/components/WorkflowModal';
import type { Database } from '@/integrations/supabase/types';

type SOPCategory = Database['public']['Enums']['sop_category'];
type SOP = Database['public']['Tables']['sops']['Row'];

interface WorkflowStep {
  id: string;
  title: string;
  type: 'start' | 'process' | 'decision' | 'end';
  next?: string[];
}

interface GenerateNewSOPProps {
  editingSOP?: SOP | null;
  onSOPCreated?: () => void;
  onClearEdit?: () => void;
}

const GenerateNewSOP: React.FC<GenerateNewSOPProps> = ({ 
  editingSOP, 
  onSOPCreated, 
  onClearEdit 
}) => {
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState<SOPCategory | ''>('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [tools, setTools] = useState('');
  const [format, setFormat] = useState('numbered steps');
  const [tone, setTone] = useState('Professional and instructional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSOP, setGeneratedSOP] = useState('');
  const [generatedWorkflow, setGeneratedWorkflow] = useState<WorkflowStep[]>([]);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Populate form when editing
  useEffect(() => {
    if (editingSOP) {
      setTitle(editingSOP.title);
      setGoal(editingSOP.description || '');
      setCategory(editingSOP.category);
      setTags(editingSOP.tags?.join(', ') || '');
      setGeneratedSOP(editingSOP.generated_content || '');
      const desc = editingSOP.description || '';
      if (desc.includes('Tools:')) {
        const toolsMatch = desc.match(/Tools:\s*([^\n]*)/);
        if (toolsMatch) setTools(toolsMatch[1]);
      }
    }
  }, [editingSOP]);

  const generateWorkflowFromSOP = (sopContent: string): WorkflowStep[] => {
    // Extract steps from SOP content and convert to workflow
    const lines = sopContent.split('\n').filter(line => line.trim());
    const steps: WorkflowStep[] = [];
    
    // Add start step
    steps.push({
      id: 'start',
      title: 'Start Process',
      type: 'start',
      next: ['step1']
    });

    // Extract numbered steps or bullet points
    let stepCounter = 1;
    lines.forEach((line, index) => {
      if (line.match(/^\d+\./) || line.match(/^[-*]\s/)) {
        const stepTitle = line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim();
        if (stepTitle.length > 0 && stepTitle.length < 100) {
          const stepId = `step${stepCounter}`;
          const nextStepId = stepCounter < 10 ? `step${stepCounter + 1}` : 'end';
          
          steps.push({
            id: stepId,
            title: stepTitle,
            type: stepTitle.toLowerCase().includes('decision') || stepTitle.includes('?') ? 'decision' : 'process',
            next: [nextStepId]
          });
          stepCounter++;
        }
      }
    });

    // Add end step
    if (steps.length > 1) {
      const lastStepId = steps[steps.length - 1].id;
      steps[steps.length - 1].next = ['end'];
    }
    
    steps.push({
      id: 'end',
      title: 'Process Complete',
      type: 'end'
    });

    return steps.length > 2 ? steps : [
      { id: 'start', title: 'Start Process', type: 'start', next: ['process1'] },
      { id: 'process1', title: 'Execute Main Task', type: 'process', next: ['end'] },
      { id: 'end', title: 'Process Complete', type: 'end' }
    ];
  };

  const handleGenerate = async () => {
    if (!goal || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in the goal and category fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-sop', {
        body: {
          goal,
          department: category,
          tools,
          format,
          tone
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        toast({
          title: "Generation Failed",
          description: "Failed to generate SOP. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data?.generatedSOP) {
        setGeneratedSOP(data.generatedSOP);
        
        // Generate workflow from SOP content
        const workflowSteps = generateWorkflowFromSOP(data.generatedSOP);
        setGeneratedWorkflow(workflowSteps);
        
        toast({
          title: "SOP & Workflow Generated Successfully!",
          description: "Your Standard Operating Procedure and visual workflow have been created using AI.",
        });
      } else {
        toast({
          title: "Generation Failed",
          description: "No content was generated. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate SOP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedSOP || !user) {
      toast({
        title: "Nothing to save",
        description: "Please generate an SOP first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const sopData = {
        title: title || `${category} SOP: ${goal}`,
        description: `Goal: ${goal}${tools ? `\nTools: ${tools}` : ''}${format ? `\nFormat: ${format}` : ''}${tone ? `\nTone: ${tone}` : ''}`,
        category: category as SOPCategory,
        generated_content: generatedSOP,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        user_id: user.id
      };

      // Save SOP
      if (editingSOP) {
        const { error } = await supabase
          .from('sops')
          .update(sopData)
          .eq('id', editingSOP.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('sops')
          .insert(sopData);

        if (error) throw error;
      }

      // Save Workflow if generated
      if (generatedWorkflow.length > 0) {
        const workflowData = {
          user_id: user.id,
          title: `${title || goal} - Workflow`,
          description: `Auto-generated workflow for: ${goal}`,
          thumbnail_url: '/placeholder.svg'
        };

        const { error: workflowError } = await supabase
          .from('workflows')
          .insert(workflowData);

        if (workflowError) {
          console.error('Workflow save error:', workflowError);
        }
      }

      toast({
        title: editingSOP ? "SOP Updated!" : "SOP & Workflow Saved!",
        description: editingSOP ? "Your SOP has been successfully updated." : "Your SOP and workflow have been saved successfully.",
      });

      // Reset form
      setGoal('');
      setCategory('');
      setTitle('');
      setTags('');
      setTools('');
      setFormat('numbered steps');
      setTone('Professional and instructional');
      setGeneratedSOP('');
      setGeneratedWorkflow([]);

      if (onSOPCreated) {
        onSOPCreated();
      }
      if (onClearEdit) {
        onClearEdit();
      }

    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleExportSOP = () => {
    if (!generatedSOP) {
      toast({
        title: "Nothing to export",
        description: "Please generate an SOP first.",
        variant: "destructive",
      });
      return;
    }

    const content = `# ${title || `${category} SOP: ${goal}`}\n\n${generatedSOP}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(title || goal).replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "SOP Exported",
      description: "Your SOP has been downloaded as a markdown file.",
    });
  };

  const handleClearEdit = () => {
    setTitle('');
    setGoal('');
    setCategory('');
    setTags('');
    setTools('');
    setFormat('numbered steps');
    setTone('Professional and instructional');
    setGeneratedSOP('');
    setGeneratedWorkflow([]);
    if (onClearEdit) {
      onClearEdit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">
          {editingSOP ? 'Edit SOP' : 'Generate SOP & Workflow'}
        </h1>
        {editingSOP && (
          <Button variant="outline" onClick={handleClearEdit}>
            Cancel Edit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>AI SOP & Workflow Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">SOP Title (Optional)</Label>
              <Input
                id="title"
                placeholder="e.g., Customer Service Protocol"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="goal">Goal/Task Description *</Label>
              <Textarea
                id="goal"
                placeholder="e.g., Automate the client onboarding process for a digital marketing agency"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="min-h-32"
              />
            </div>

            <div>
              <Label htmlFor="category">Department/Function *</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as SOPCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="IT">Information Technology</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tools">Tools/Platforms Used</Label>
              <Input
                id="tools"
                placeholder="e.g., HubSpot, Slack, Google Sheets"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="format">Preferred Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="numbered steps">Numbered Steps</SelectItem>
                  <SelectItem value="bullet points">Bullet Points</SelectItem>
                  <SelectItem value="tabular format">Tabular Format</SelectItem>
                  <SelectItem value="flowchart style">Flowchart Style</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional and instructional">Professional</SelectItem>
                  <SelectItem value="Beginner-friendly">Beginner-friendly</SelectItem>
                  <SelectItem value="Technical and detailed">Technical</SelectItem>
                  <SelectItem value="Casual and conversational">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (Optional)</Label>
              <Input
                id="tags"
                placeholder="e.g., onboarding, customer, process"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate tags with commas
              </p>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={!goal || !category || isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating SOP & Workflow...' : 'Generate SOP & Workflow with AI'}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {isGenerating ? (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-lg font-medium">Generating SOP & Workflow with AI...</p>
                  <p className="text-sm text-muted-foreground">This may take a few moments</p>
                </div>
              </CardContent>
            </Card>
          ) : (generatedSOP || generatedWorkflow.length > 0) ? (
            <Tabs defaultValue="sop" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sop">📄 SOP Content</TabsTrigger>
                <TabsTrigger value="workflow">🔄 Visual Workflow</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sop">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated SOP</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="max-h-96 overflow-y-auto bg-muted p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm font-sans">{generatedSOP}</pre>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={handleSave} className="flex-1">
                          {editingSOP ? 'Update SOP' : 'Save SOP & Workflow'}
                        </Button>
                        <Button variant="outline" onClick={handleExportSOP} className="flex-1">
                          Export SOP
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="workflow">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Generated Workflow</CardTitle>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsWorkflowModalOpen(true)}
                        disabled={generatedWorkflow.length === 0}
                      >
                        View Full Workflow
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {generatedWorkflow.length > 0 ? (
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                          <WorkflowVisualization 
                            steps={generatedWorkflow.slice(0, 5)} 
                            isPreview={true}
                            onStartClick={() => setIsWorkflowModalOpen(true)}
                          />
                          {generatedWorkflow.length > 5 && (
                            <div className="text-center mt-4 text-sm text-muted-foreground">
                              + {generatedWorkflow.length - 5} more steps (click "View Full Workflow" to see all)
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button onClick={handleSave} className="flex-1">
                            {editingSOP ? 'Update SOP' : 'Save SOP & Workflow'}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsWorkflowModalOpen(true)}
                            className="flex-1"
                          >
                            Open Interactive Workflow
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>Workflow will be generated automatically with your SOP</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96 text-muted-foreground">
                <div className="text-center space-y-2">
                  <p className="text-lg">AI-generated SOP and Workflow will appear here</p>
                  <p className="text-sm">Fill in the form and click "Generate SOP & Workflow with AI" to get started</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Workflow Modal */}
      <WorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        steps={generatedWorkflow}
        title={title || `${category} Workflow: ${goal}`}
      />
    </div>
  );
};

export default GenerateNewSOP;
