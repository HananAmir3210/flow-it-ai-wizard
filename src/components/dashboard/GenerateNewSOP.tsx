
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
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<SOPCategory | ''>('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSOP, setGeneratedSOP] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  // Populate form when editing
  useEffect(() => {
    if (editingSOP) {
      setTitle(editingSOP.title);
      setPrompt(editingSOP.description || '');
      setCategory(editingSOP.category);
      setTags(editingSOP.tags?.join(', ') || '');
      setGeneratedSOP(editingSOP.generated_content || '');
    }
  }, [editingSOP]);

  const generateAISOP = async (userPrompt: string, sopCategory: string) => {
    // Simple AI SOP generation - in a real app, you'd use OpenAI/Gemini API
    const templates: Record<string, string> = {
      'Marketing': `# Marketing SOP: ${userPrompt}

## Objective
This Standard Operating Procedure outlines the marketing process for ${userPrompt.toLowerCase()}.

## Scope
This SOP applies to all marketing team members involved in ${userPrompt.toLowerCase()}.

## Procedure

### Step 1: Market Research
- Analyze target audience demographics and preferences
- Research competitor strategies and market positioning
- Identify key market trends and opportunities
- Document findings in market research report

### Step 2: Strategy Development
- Define marketing objectives and KPIs
- Develop value proposition and messaging
- Select appropriate marketing channels
- Create content calendar and timeline

### Step 3: Campaign Creation
- Develop creative assets (graphics, copy, videos)
- Set up tracking and analytics systems
- Prepare marketing materials and resources
- Conduct internal review and approval process

### Step 4: Execution and Launch
- Deploy campaigns across selected channels
- Monitor performance metrics in real-time
- Engage with audience and respond to feedback
- Coordinate with sales and support teams

### Step 5: Analysis and Optimization
- Collect and analyze performance data
- Generate comprehensive campaign reports
- Identify areas for improvement
- Implement optimization strategies for future campaigns

## Key Performance Indicators
- Lead generation: Target 25% increase month-over-month
- Engagement rate: Maintain above 3% across all channels
- Conversion rate: Achieve 5% minimum conversion rate
- ROI: Target 300% return on marketing investment

## Quality Assurance
- All marketing materials must be reviewed by senior team member
- Brand guidelines compliance check required
- Legal and compliance review for regulated content
- A/B testing protocols for major campaigns`,

      'HR': `# Human Resources SOP: ${userPrompt}

## Purpose
This procedure establishes guidelines for ${userPrompt.toLowerCase()} within the Human Resources department.

## Scope
This SOP applies to all HR personnel and managers involved in ${userPrompt.toLowerCase()}.

## Procedure

### Step 1: Initial Assessment
- Review current policies and procedures
- Identify stakeholders and requirements
- Assess legal and compliance considerations
- Document current state and desired outcomes

### Step 2: Planning and Preparation
- Develop detailed action plan and timeline
- Secure necessary resources and approvals
- Prepare required documentation and forms
- Schedule meetings with relevant parties

### Step 3: Implementation
- Execute planned activities according to timeline
- Maintain detailed records of all actions
- Communicate progress to stakeholders
- Address issues and challenges as they arise

### Step 4: Review and Documentation
- Conduct thorough review of completed process
- Update employee records and systems
- Generate required reports and documentation
- Ensure compliance with policies and regulations

### Step 5: Follow-up and Continuous Improvement
- Schedule follow-up meetings as needed
- Monitor outcomes and effectiveness
- Gather feedback from participants
- Update procedures based on lessons learned

## Compliance Requirements
- All activities must comply with federal and state employment laws
- Maintain confidentiality of employee information
- Document all decisions and actions taken
- Regular training updates required for all HR staff

## Documentation
- Maintain accurate records in HRIS system
- Store physical documents per retention policy
- Ensure backup copies of critical documents
- Regular audit of documentation compliance`,

      'default': `# Standard Operating Procedure: ${userPrompt}

## Overview
This Standard Operating Procedure provides comprehensive guidelines for ${userPrompt.toLowerCase()}.

## Objective
To ensure consistent, efficient, and quality execution of ${userPrompt.toLowerCase()} across the organization.

## Scope
This SOP applies to all team members involved in ${userPrompt.toLowerCase()}.

## Procedure

### Step 1: Preparation and Planning
- Review requirements and gather necessary information
- Identify required resources and tools
- Assess potential risks and mitigation strategies
- Create detailed project timeline

### Step 2: Initial Execution
- Begin process according to established timeline
- Monitor progress against defined milestones
- Document all activities and decisions
- Communicate status to relevant stakeholders

### Step 3: Quality Control
- Conduct regular quality checks and assessments
- Implement corrective actions as needed
- Verify compliance with standards and requirements
- Update documentation with any changes

### Step 4: Completion and Review
- Finalize all deliverables and documentation
- Conduct comprehensive review of outcomes
- Generate final reports and analysis
- Archive all relevant materials

### Step 5: Continuous Improvement
- Analyze process effectiveness and efficiency
- Identify opportunities for improvement
- Update procedures based on lessons learned
- Train team members on any changes

## Key Performance Indicators
- Process completion time: Within established timeframes
- Quality metrics: 95% accuracy rate minimum
- Stakeholder satisfaction: 4.0/5.0 average rating
- Compliance rate: 100% adherence to procedures

## Responsibilities
- **Process Owner**: Overall accountability and oversight
- **Team Members**: Execute procedures and report issues
- **Quality Assurance**: Monitor compliance and quality
- **Management**: Provide resources and support

## Review and Updates
This SOP will be reviewed quarterly and updated as needed to ensure continued effectiveness and relevance.`
    };

    const template = templates[sopCategory] || templates['default'];
    return template;
  };

  const handleGenerate = async () => {
    if (!prompt || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedContent = await generateAISOP(prompt, category);
      setGeneratedSOP(generatedContent);
      
      toast({
        title: "SOP Generated Successfully!",
        description: "Your Standard Operating Procedure has been created.",
      });
    } catch (error) {
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
        title: title || `${category} SOP: ${prompt}`,
        description: prompt,
        category: category as SOPCategory,
        generated_content: generatedSOP,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        user_id: user.id
      };

      if (editingSOP) {
        // Update existing SOP
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
        // Create new SOP
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
      setPrompt('');
      setCategory('');
      setTitle('');
      setTags('');
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

    const content = `# ${title || `${category} SOP: ${prompt}`}\n\n${generatedSOP}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(title || prompt).replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
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
    setPrompt('');
    setCategory('');
    setTags('');
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
            <CardTitle>SOP Generator</CardTitle>
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
              <Label htmlFor="prompt">Describe your process or goal *</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., Customer complaint resolution process, Employee performance review, Product quality control..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
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
              disabled={!prompt || !category || isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating SOP...' : 'Generate SOP'}
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
                <p>Generated SOP will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateNewSOP;
