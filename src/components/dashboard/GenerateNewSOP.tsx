
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface GenerateNewSOPProps {
  onSOPCreated?: () => void;
}

const GenerateNewSOP = ({ onSOPCreated }: GenerateNewSOPProps) => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSOP, setGeneratedSOP] = useState('');
  const { toast } = useToast();

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
    // Simulate API call
    setTimeout(() => {
      const sopTitle = title || `${category} SOP: ${prompt}`;
      setGeneratedSOP(`
# ${sopTitle}

## Overview
This Standard Operating Procedure (SOP) outlines the process for ${prompt.toLowerCase()}.

## Objective
To ensure consistent and efficient execution of ${prompt.toLowerCase()} across the organization.

## Scope
This SOP applies to all team members involved in ${prompt.toLowerCase()}.

## Procedure

### Step 1: Initial Assessment
- Review requirements and gather necessary information
- Identify key stakeholders and resources needed
- Document current state and desired outcomes

### Step 2: Planning Phase
- Create detailed project timeline
- Assign responsibilities to team members
- Set up monitoring and tracking systems
- Establish communication protocols

### Step 3: Execution
- Follow established protocols and guidelines
- Document progress at each milestone
- Communicate updates to relevant stakeholders
- Monitor quality and performance metrics

### Step 4: Review and Quality Assurance
- Conduct thorough review of deliverables
- Implement quality control measures
- Address any identified issues or gaps
- Validate against established criteria

### Step 5: Completion and Documentation
- Finalize all documentation and reports
- Conduct post-process review and lessons learned
- Archive relevant materials for future reference
- Update procedures based on insights gained

## Key Performance Indicators
- Process completion time: Target within established timeframes
- Quality metrics: 95% accuracy rate
- Stakeholder satisfaction: 4.5/5 average rating
- Compliance rate: 100% adherence to procedures

## Responsibilities
- **Process Owner**: Overall accountability for SOP execution
- **Team Members**: Following procedures and reporting issues
- **Quality Assurance**: Monitoring compliance and quality
- **Management**: Providing resources and support

## Revision History
- Version 1.0: Initial creation - ${new Date().toLocaleDateString()}
- Last Updated: ${new Date().toLocaleDateString()}

## Approval
This SOP has been reviewed and approved by the relevant stakeholders.
      `);
      setIsGenerating(false);
      toast({
        title: "SOP Generated Successfully!",
        description: "Your Standard Operating Procedure has been created.",
      });
    }, 2000);
  };

  const handleSave = () => {
    if (!generatedSOP) {
      toast({
        title: "Nothing to save",
        description: "Please generate an SOP first.",
        variant: "destructive",
      });
      return;
    }

    // Simulate saving to local storage or backend
    const sopData = {
      id: Date.now(),
      title: title || `${category} SOP: ${prompt}`,
      content: generatedSOP,
      category,
      prompt,
      dateCreated: new Date().toISOString(),
      tags: [category.toLowerCase(), ...prompt.toLowerCase().split(' ').slice(0, 2)]
    };

    // Save to localStorage for demo purposes
    const existingSOPs = JSON.parse(localStorage.getItem('user-sops') || '[]');
    existingSOPs.push(sopData);
    localStorage.setItem('user-sops', JSON.stringify(existingSOPs));

    toast({
      title: "SOP Saved!",
      description: "Your SOP has been saved to My SOPs.",
    });

    // Reset form
    setPrompt('');
    setCategory('');
    setTitle('');
    setGeneratedSOP('');

    // Navigate to My SOPs
    if (onSOPCreated) {
      onSOPCreated();
    }
  };

  const handleExportPDF = () => {
    toast({
      title: "Export Feature",
      description: "PDF export functionality will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Generate New SOP</h1>
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
              <Select value={category} onValueChange={setCategory}>
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
                  <pre className="whitespace-pre-wrap text-sm">{generatedSOP}</pre>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    Save to My SOPs
                  </Button>
                  <Button variant="outline" onClick={handleExportPDF} className="flex-1">
                    Export PDF
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
