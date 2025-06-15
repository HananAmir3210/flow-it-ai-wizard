
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { Database } from '@/integrations/supabase/types';

type SOPCategory = Database['public']['Enums']['sop_category'];
type SOP = Database['public']['Tables']['sops']['Row'];

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
      // Extract additional fields from description if they were saved there
      const desc = editingSOP.description || '';
      if (desc.includes('Tools:')) {
        const toolsMatch = desc.match(/Tools:\s*([^\n]*)/);
        if (toolsMatch) setTools(toolsMatch[1]);
      }
    }
  }, [editingSOP]);

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
        toast({
          title: "SOP Generated Successfully!",
          description: "Your Standard Operating Procedure has been created using AI.",
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

      if (editingSOP) {
        const { error } = await supabase
          .from('sops')
          .update(sopData)
          .eq('id', editingSOP.id)
          .eq('user_id', user.id);

        if (error) throw error;

        toast({
          title: "SOP Updated!",
          description: "Your SOP has been successfully updated.",
        });
      } else {
        const { error } = await supabase
          .from('sops')
          .insert(sopData);

        if (error) throw error;

        toast({
          title: "SOP Saved!",
          description: "Your SOP has been saved successfully.",
        });
      }

      // Reset form
      setGoal('');
      setCategory('');
      setTitle('');
      setTags('');
      setTools('');
      setFormat('numbered steps');
      setTone('Professional and instructional');
      setGeneratedSOP('');

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

  const handleExportPDF = () => {
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
    if (onClearEdit) {
      onClearEdit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">
          {editingSOP ? 'Edit SOP' : 'Generate New SOP'}
        </h1>
        {editingSOP && (
          <Button variant="outline" onClick={handleClearEdit}>
            Cancel Edit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>AI SOP Generator</CardTitle>
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
              {isGenerating ? 'Generating SOP with AI...' : 'Generate SOP with AI'}
            </Button>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generated SOP</CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : generatedSOP ? (
              <div className="space-y-4">
                <div className="max-h-96 overflow-y-auto bg-muted p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-sans">{generatedSOP}</pre>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    {editingSOP ? 'Update SOP' : 'Save to My SOPs'}
                  </Button>
                  <Button variant="outline" onClick={handleExportPDF} className="flex-1">
                    Export Markdown
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p>AI-generated SOP will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateNewSOP;
