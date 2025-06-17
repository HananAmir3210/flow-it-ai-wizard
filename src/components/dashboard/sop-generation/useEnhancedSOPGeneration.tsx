
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { GeneratedContent } from './types';

interface SOPPreferences {
  tone: 'formal' | 'casual' | 'instructional';
  outputLength: 'concise' | 'detailed';
  includeCompliance: boolean;
  language: string;
}

export const useEnhancedSOPGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generationHistory, setGenerationHistory] = useState<Array<{
    timestamp: Date;
    content: GeneratedContent;
    preferences: SOPPreferences;
  }>>([]);
  const { toast } = useToast();

  const generateSOPAndWorkflow = async (
    title: string,
    description: string,
    category: string,
    tags: string[],
    preferences: SOPPreferences
  ) => {
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
      console.log('Starting enhanced SOP generation...', { 
        title, 
        description, 
        category, 
        tags, 
        preferences 
      });
      
      // Enhanced prompt with preferences
      const enhancedPrompt = `
        Generate a ${preferences.outputLength} SOP with ${preferences.tone} tone in ${preferences.language}.
        ${preferences.includeCompliance ? 'Include compliance and safety considerations.' : ''}
        
        Title: ${title}
        Description: ${description}
        Category: ${category}
        Tags: ${tags.join(', ')}
      `;
      
      const { data, error } = await supabase.functions.invoke('generate-enhanced-sop', {
        body: {
          title: title.trim(),
          description: enhancedPrompt,
          category,
          tags,
          preferences
        }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Failed to generate SOP and workflow: ${error.message}`);
      }

      if (!data || !data.sop || !data.workflow) {
        console.error('Invalid response format:', data);
        // Enhanced fallback content
        const fallbackContent = createEnhancedFallbackContent(title, description, preferences);
        setGeneratedContent(fallbackContent);
        addToHistory(fallbackContent, preferences);
        
        toast({
          title: "Fallback Content Generated",
          description: "Using enhanced template content. Please customize as needed.",
          variant: "default",
        });
      } else {
        // Validate and enhance workflow steps
        const validatedWorkflow = data.workflow.map((step: any) => ({
          ...step,
          connections: step.connections || [],
          x: step.x || 0,
          y: step.y || 0
        }));
        
        const content = {
          sop: data.sop,
          workflow: validatedWorkflow
        };
        
        setGeneratedContent(content);
        addToHistory(content, preferences);
        
        // Show success with confetti effect
        toast({
          title: "🎉 Generated Successfully!",
          description: "Your professional SOP and workflow are ready for review.",
        });
      }
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

  const addToHistory = (content: GeneratedContent, preferences: SOPPreferences) => {
    setGenerationHistory(prev => [...prev, {
      timestamp: new Date(),
      content,
      preferences
    }]);
  };

  const createEnhancedFallbackContent = (
    title: string, 
    description: string, 
    preferences: SOPPreferences
  ): GeneratedContent => {
    const toneAdjustments = {
      formal: { prefix: "This document outlines the formal procedure for", language: "shall be" },
      casual: { prefix: "Here's how to handle", language: "should be" },
      instructional: { prefix: "Follow these steps to complete", language: "must be" }
    };

    const tone = toneAdjustments[preferences.tone];
    const isDetailed = preferences.outputLength === 'detailed';

    const steps = [
      {
        number: 1,
        title: "Preparation and Planning",
        description: `${tone.prefix} the initial setup phase for ${title.toLowerCase()}.`,
        details: isDetailed ? [
          "Review all requirements and documentation",
          "Identify stakeholders and their roles",
          "Gather necessary resources and tools",
          "Establish communication protocols",
          "Set clear objectives and success criteria"
        ] : [
          "Review requirements",
          "Identify stakeholders", 
          "Gather resources"
        ]
      },
      {
        number: 2,
        title: "Implementation and Execution",
        description: `Execute the main process steps as outlined in ${description}`,
        details: isDetailed ? [
          "Follow established procedures systematically",
          "Document all activities and decisions",
          "Monitor progress against milestones",
          "Address issues through escalation procedures",
          "Maintain quality standards throughout"
        ] : [
          "Follow procedures",
          "Document activities",
          "Monitor progress"
        ]
      },
      {
        number: 3,
        title: "Quality Assurance and Review",
        description: `Quality checks and validation ${tone.language} performed to ensure standards are met.`,
        details: isDetailed ? [
          "Conduct comprehensive quality checks",
          "Review work with supervisors or peers",
          "Obtain required approvals and sign-offs",
          "Address any identified gaps or issues",
          "Document quality assurance activities"
        ] : [
          "Perform quality checks",
          "Obtain approvals",
          "Address issues"
        ]
      }
    ];

    if (preferences.includeCompliance) {
      steps.push({
        number: 4,
        title: "Compliance and Safety Verification",
        description: "Ensure all regulatory and safety requirements are met.",
        details: [
          "Verify compliance with relevant regulations",
          "Check safety protocols and requirements",
          "Document compliance verification",
          "Address any compliance gaps"
        ]
      });
    }

    const content = steps.map(step => 
      `## Step ${step.number}: ${step.title}\n\n${step.description}\n\n${step.details.map(detail => `• ${detail}`).join('\n')}`
    ).join('\n\n');

    return {
      sop: {
        title: `${title} - Standard Operating Procedure`,
        content,
        steps
      },
      workflow: [
        { id: '1', title: 'Start', description: 'Begin process', type: 'start' as const, x: 100, y: 100, connections: ['2'] },
        { id: '2', title: 'Prepare', description: 'Preparation phase', type: 'process' as const, x: 300, y: 100, connections: ['3'] },
        { id: '3', title: 'Execute', description: 'Implementation', type: 'process' as const, x: 500, y: 100, connections: ['4'] },
        { id: '4', title: 'Review', description: 'Quality check', type: 'decision' as const, x: 700, y: 100, connections: ['5', '3'] },
        { id: '5', title: 'Complete', description: 'Process complete', type: 'end' as const, x: 900, y: 100, connections: [] }
      ]
    };
  };

  const regenerateWithSameSettings = () => {
    const lastGeneration = generationHistory[generationHistory.length - 1];
    if (lastGeneration && generatedContent) {
      // Regenerate with the same preferences
      return lastGeneration.preferences;
    }
    return null;
  };

  return {
    isGenerating,
    generatedContent,
    setGeneratedContent,
    generateSOPAndWorkflow,
    generationHistory,
    regenerateWithSameSettings
  };
};
