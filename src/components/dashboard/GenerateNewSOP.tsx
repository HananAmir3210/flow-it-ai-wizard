
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Zap, Save, FileText } from 'lucide-react';

const GenerateNewSOP = () => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSOP, setGeneratedSOP] = useState('');

  const categories = [
    'Marketing',
    'Human Resources',
    'Operations',
    'Customer Service',
    'Sales',
    'IT & Technology',
    'Finance',
    'Quality Assurance',
    'Legal & Compliance',
    'Project Management'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedSOP(`
# ${prompt}

## Overview
This SOP outlines the standardized process for ${prompt.toLowerCase()}.

## Purpose
To ensure consistent, efficient, and quality execution of ${prompt.toLowerCase()} across the organization.

## Scope
This procedure applies to all team members involved in ${prompt.toLowerCase()}.

## Responsibilities
- **Team Lead**: Overall oversight and quality control
- **Team Members**: Execute the process according to guidelines
- **Manager**: Review and approve final outputs

## Procedure

### Step 1: Preparation
1. Review all relevant documentation
2. Gather necessary resources and tools
3. Confirm timeline and deliverables

### Step 2: Execution
1. Follow the established workflow
2. Document progress at each milestone
3. Conduct quality checks

### Step 3: Review & Finalization
1. Internal review by team lead
2. Manager approval
3. Final documentation and archival

## Quality Control
- Regular audits of the process
- Feedback collection from stakeholders
- Continuous improvement initiatives

## Documentation
- All steps must be documented
- Templates and forms to be used consistently
- Records to be maintained for audit purposes

## Training
New team members must complete training on this SOP before execution.
      `);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    console.log('Saving SOP to user collection...');
    // Implementation for saving SOP
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <Lightbulb className="text-yellow-500" />
          <span>Generate New SOP</span>
        </h1>
        <p className="text-muted-foreground">
          Describe your process and let AI create a comprehensive Standard Operating Procedure
        </p>
      </div>

      {/* Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle>SOP Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Describe your goal or task
            </label>
            <Input
              placeholder="e.g., Customer onboarding process, Marketing campaign launch, Employee training..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full flex items-center space-x-2"
          >
            <Zap size={16} />
            <span>{isGenerating ? 'Generating SOP...' : 'Generate SOP'}</span>
          </Button>
        </CardContent>
      </Card>

      {/* Generated Result */}
      {(generatedSOP || isGenerating) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generated SOP */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText size={20} />
                <span>Generated SOP</span>
              </CardTitle>
              {generatedSOP && (
                <Button onClick={handleSave} size="sm" className="flex items-center space-x-1">
                  <Save size={14} />
                  <span>Save to My SOPs</span>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Generating your SOP...</span>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">{generatedSOP}</pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Workflow Visualizer */}
          <Card>
            <CardHeader>
              <CardTitle>Workflow Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-pulse bg-gray-200 rounded h-48 w-full"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-blue-600 font-medium">Interactive Workflow</div>
                    <div className="text-sm text-blue-500 mt-1">
                      Visual representation of your SOP process
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Open Workflow Editor
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Template Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Popular SOP Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Customer Service Response',
              'Employee Onboarding',
              'Marketing Campaign Launch',
              'Quality Control Process',
              'Sales Lead Qualification',
              'IT Incident Response'
            ].map((template, index) => (
              <button
                key={index}
                onClick={() => setPrompt(template)}
                className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm">{template}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Pre-built template ready to customize
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateNewSOP;
