import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, FileText, Workflow, Save, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { supabase } from '@/integrations/supabase/client';
import SOPPreviewModal from '@/components/modals/SOPPreviewModal';
import WorkflowWhiteboard from '@/components/WorkflowWhiteboard';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'];
type SOPCategory = Database['public']['Enums']['sop_category'];

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  connections: string[];
}

interface GeneratedContent {
  sop: {
    title: string;
    content: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      details: string[];
    }>;
  };
  workflow: WorkflowStep[];
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
  const [title, setTitle] = useState(editingSOP?.title || '');
  const [description, setDescription] = useState(editingSOP?.description || '');
  const [category, setCategory] = useState<SOPCategory>(editingSOP?.category || 'Operations');
  const [tags, setTags] = useState<string[]>(editingSOP?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sop');

  const { toast } = useToast();
  const { createSOP, updateSOP, loading } = useSupabaseData();

  // Initialize with existing SOP data if editing
  React.useEffect(() => {
    if (editingSOP) {
      setTitle(editingSOP.title);
      setDescription(editingSOP.description || '');
      setCategory(editingSOP.category);
      setTags(editingSOP.tags || []);
      
      if (editingSOP.generated_content && editingSOP.workflow_data) {
        try {
          const content = JSON.parse(editingSOP.generated_content);
          const workflow = editingSOP.workflow_data as unknown as WorkflowStep[];
          setGeneratedContent({ sop: content, workflow });
        } catch (error) {
          console.error('Error parsing existing SOP data:', error);
        }
      }
    }
  }, [editingSOP]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateSOPAndWorkflow = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Starting SOP generation...', { title, description, category, tags });
      
      const { data, error } = await supabase.functions.invoke('generate-enhanced-sop', {
        body: {
          title: title.trim(),
          description: description.trim(),
          category,
          tags
        }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Failed to generate SOP and workflow: ${error.message}`);
      }

      if (!data || !data.sop || !data.workflow) {
        throw new Error('Invalid response format from function');
      }
      
      setGeneratedContent(data);
      setActiveTab('sop');
      
      toast({
        title: "Generated Successfully!",
        description: "Your SOP and workflow have been created. Review them in the tabs below.",
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Unable to generate SOP and workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveSOP = async () => {
    if (!generatedContent) {
      toast({
        title: "Nothing to Save",
        description: "Please generate content first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const sopData = {
        title,
        description,
        category,
        generatedContent: JSON.stringify(generatedContent.sop),
        tags,
      };

      let result;
      if (editingSOP) {
        result = await updateSOP(editingSOP.id, {
          ...sopData,
          workflow_data: generatedContent.workflow,
        });
      } else {
        result = await createSOP({
          ...sopData,
          workflow_data: generatedContent.workflow,
        } as any);
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: editingSOP ? "SOP Updated" : "SOP Saved",
        description: `Your SOP and workflow have been ${editingSOP ? 'updated' : 'saved'} successfully.`,
      });

      if (onSOPCreated) onSOPCreated();
      if (onClearEdit) onClearEdit();
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('Operations');
      setTags([]);
      setGeneratedContent(null);
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Unable to save SOP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportSOP = () => {
    if (!generatedContent) return;

    const content = `# ${title}\n\n## Description\n${description}\n\n## Category\n${category}\n\n${generatedContent.sop.content}\n\n## Tags\n${tags.join(', ')}\n\nGenerated on: ${new Date().toLocaleDateString()}`;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "SOP Exported",
      description: "Your SOP has been downloaded as a markdown file.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {editingSOP ? 'Edit SOP & Workflow' : 'Generate SOP & Workflow'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Create comprehensive SOPs with matching visual workflows using AI
          </p>
        </div>
        {editingSOP && onClearEdit && (
          <Button variant="outline" onClick={onClearEdit}>
            Create New SOP
          </Button>
        )}
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SOP Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                placeholder="e.g., Customer Onboarding Process"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={(value: SOPCategory) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <Textarea
              placeholder="Describe the process you want to create an SOP for. Be specific about the goals, stakeholders, and key requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button onClick={addTag} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            onClick={generateSOPAndWorkflow} 
            disabled={isGenerating || !title.trim() || !description.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating SOP & Workflow...
              </>
            ) : (
              <>
                <Workflow className="h-4 w-4 mr-2" />
                Generate SOP & Workflow
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Content</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" onClick={exportSOP}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button onClick={saveSOP} disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {editingSOP ? 'Update SOP' : 'Save SOP'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sop">
                  <FileText className="h-4 w-4 mr-2" />
                  SOP Document
                </TabsTrigger>
                <TabsTrigger value="workflow">
                  <Workflow className="h-4 w-4 mr-2" />
                  Visual Workflow
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sop" className="mt-4">
                <div className="prose max-w-none">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">{generatedContent.sop.title}</h2>
                    <div className="space-y-4">
                      {generatedContent.sop.steps.map((step, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <h3 className="font-semibold text-lg">
                            Step {step.number}: {step.title}
                          </h3>
                          <p className="text-gray-700 mb-2">{step.description}</p>
                          {step.details.length > 0 && (
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {step.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="workflow" className="mt-4">
                <WorkflowWhiteboard 
                  steps={generatedContent.workflow}
                  title={title}
                  readonly={false}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Preview Modal */}
      {generatedContent && (
        <SOPPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          sop={generatedContent.sop}
          workflow={generatedContent.workflow}
        />
      )}
    </div>
  );
};

export default GenerateNewSOP;
