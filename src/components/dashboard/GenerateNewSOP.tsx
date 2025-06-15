
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const GenerateNewSOP = () => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSOP, setGeneratedSOP] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedSOP(`
# ${category} SOP: ${prompt}

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

### Step 2: Planning Phase
- Create detailed project timeline
- Assign responsibilities to team members
- Set up monitoring and tracking systems

### Step 3: Execution
- Follow established protocols
- Document progress at each milestone
- Communicate updates to stakeholders

### Step 4: Review and Quality Assurance
- Conduct thorough review of deliverables
- Implement quality control measures
- Address any identified issues

### Step 5: Completion and Documentation
- Finalize all documentation
- Conduct post-process review
- Archive relevant materials

## Key Performance Indicators
- Process completion time
- Quality metrics
- Stakeholder satisfaction

## Revision History
- Version 1.0: Initial creation
      `);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    console.log('Saving SOP:', { prompt, category, content: generatedSOP });
    // Implement save logic
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Generate New SOP</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>SOP Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="prompt">Describe your goal or task</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., Customer complaint resolution process, Employee performance review, Product quality control..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
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
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    Save to My SOPs
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Generate Workflow
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
