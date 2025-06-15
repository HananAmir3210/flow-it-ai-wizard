
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { GeneratedContent } from './types';

export const useSOPGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const { toast } = useToast();

  const generateSOPAndWorkflow = async (
    title: string,
    description: string,
    category: string,
    tags: string[]
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
        console.error('Invalid response format:', data);
        // Create fallback content if API fails
        const fallbackContent = {
          sop: {
            title: title,
            content: `Generated SOP for ${title}`,
            steps: [
              {
                number: 1,
                title: "Initialize Process",
                description: "Begin the process outlined in the description",
                details: ["Review requirements", "Gather necessary resources", "Set up workspace"]
              },
              {
                number: 2,
                title: "Execute Main Tasks",
                description: description,
                details: ["Follow established procedures", "Document progress", "Monitor quality"]
              },
              {
                number: 3,
                title: "Complete and Review",
                description: "Finalize the process and conduct review",
                details: ["Quality check", "Document completion", "Archive relevant materials"]
              }
            ]
          },
          workflow: [
            { id: '1', title: 'Start', description: 'Begin process', type: 'start' as const, x: 100, y: 100, connections: ['2'] },
            { id: '2', title: 'Execute', description: 'Main process', type: 'process' as const, x: 300, y: 100, connections: ['3'] },
            { id: '3', title: 'Complete', description: 'End process', type: 'end' as const, x: 500, y: 100, connections: [] }
          ]
        };
        setGeneratedContent(fallbackContent);
        toast({
          title: "Fallback Content Generated",
          description: "Using template content. Please customize as needed.",
          variant: "default",
        });
      } else {
        // Ensure workflow steps have proper structure
        const validatedWorkflow = data.workflow.map((step: any) => ({
          ...step,
          connections: step.connections || [],
          x: step.x || 0,
          y: step.y || 0
        }));
        
        setGeneratedContent({
          sop: data.sop,
          workflow: validatedWorkflow
        });
        
        toast({
          title: "Generated Successfully!",
          description: "Your SOP and workflow have been created. Review them in the tabs below.",
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

  return {
    isGenerating,
    generatedContent,
    setGeneratedContent,
    generateSOPAndWorkflow
  };
};
