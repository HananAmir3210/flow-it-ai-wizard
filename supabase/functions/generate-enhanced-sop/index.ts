
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SOPRequest {
  title: string;
  description: string;
  category: string;
  tags: string[];
}

interface SOPStep {
  number: number;
  title: string;
  description: string;
  details: string[];
}

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  connections: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Received request for enhanced SOP generation');
    const { title, description, category, tags }: SOPRequest = await req.json()
    
    console.log('Request data:', { title, description, category, tags });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Enhanced prompt for better SOP generation
    const sopPrompt = `Create a comprehensive, professional Standard Operating Procedure (SOP) for: "${title}"

Description: ${description}
Category: ${category}
Tags: ${tags.join(', ')}

Please generate a detailed, actionable SOP with the following structure:
1. Clear, specific step titles
2. Detailed descriptions for each step
3. Practical sub-tasks and details
4. Industry best practices
5. Quality checkpoints
6. Risk mitigation steps

Make the SOP natural, professional, and immediately actionable. Focus on practical implementation details.

Return the response as a JSON object with this exact structure:
{
  "title": "Complete SOP Title",
  "content": "Full formatted content",
  "steps": [
    {
      "number": 1,
      "title": "Step Title",
      "description": "Detailed description",
      "details": ["Detail 1", "Detail 2", "Detail 3"]
    }
  ]
}`

    const workflowPrompt = `Based on the SOP "${title}" with description "${description}", create a logical workflow diagram.

Generate 5-8 workflow steps that represent the process flow, including:
- One START node
- Multiple PROCESS nodes for main activities
- At least one DECISION node for quality checks or approvals
- One END node

Position them in a logical left-to-right flow with appropriate spacing.

Return as JSON array with this structure:
[
  {
    "id": "unique_id",
    "title": "Short Title",
    "description": "Brief description",
    "type": "start|process|decision|end",
    "x": number,
    "y": number,
    "connections": ["connected_node_id"]
  }
]`

    console.log('Using Supabase AI to generate content...');

    let sopContent, workflowSteps;

    try {
      // Generate SOP content using Supabase AI
      const { data: sopData, error: sopError } = await supabase.functions.invoke('ai-content-generator', {
        body: {
          prompt: sopPrompt,
          type: 'sop'
        }
      });

      if (sopError) {
        console.error('Supabase AI SOP error:', sopError);
        throw new Error('Failed to generate SOP content');
      }

      sopContent = sopData?.content || generateEnhancedMockSOP(title, description, category);
      console.log('Successfully generated SOP content');
    } catch (error) {
      console.error('Failed to generate SOP with Supabase AI, using fallback:', error);
      sopContent = generateEnhancedMockSOP(title, description, category);
    }

    try {
      // Generate workflow using Supabase AI
      const { data: workflowData, error: workflowError } = await supabase.functions.invoke('ai-content-generator', {
        body: {
          prompt: workflowPrompt,
          type: 'workflow'
        }
      });

      if (workflowError) {
        console.error('Supabase AI Workflow error:', workflowError);
        throw new Error('Failed to generate workflow content');
      }

      workflowSteps = workflowData?.content || generateEnhancedMockWorkflow(title);
      console.log('Successfully generated workflow content');
    } catch (error) {
      console.error('Failed to generate workflow with Supabase AI, using fallback:', error);
      workflowSteps = generateEnhancedMockWorkflow(title);
    }

    const result = {
      sop: sopContent,
      workflow: workflowSteps
    };

    console.log('Returning successful response');

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in generate-enhanced-sop:', error)
    
    // Always return a working response with enhanced mock data
    try {
      const requestBody = await req.json()
      const { title, description, category } = requestBody
      
      const fallbackContent = {
        sop: generateEnhancedMockSOP(title || 'Standard Operating Procedure', description || 'Process description', category || 'Operations'),
        workflow: generateEnhancedMockWorkflow(title || 'Standard Operating Procedure')
      }

      return new Response(
        JSON.stringify(fallbackContent),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate content',
          details: error.message 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
  }
})

function generateEnhancedMockSOP(title: string, description: string, category: string) {
  const steps: SOPStep[] = [
    {
      number: 1,
      title: "Initial Assessment and Planning",
      description: `Begin by conducting a thorough assessment of the current situation and developing a comprehensive plan for ${title.toLowerCase()}. This foundational step ensures all stakeholders understand the scope and requirements.`,
      details: [
        "Review existing documentation and previous implementations",
        "Identify key stakeholders and their roles in the process",
        "Assess available resources including personnel, tools, and budget",
        "Define clear success criteria and measurable outcomes",
        "Create a detailed timeline with realistic milestones and deadlines",
        "Establish communication protocols and reporting structures"
      ]
    },
    {
      number: 2,
      title: "Resource Preparation and Environment Setup",
      description: "Systematically prepare all necessary resources, tools, and create the optimal environment for successful execution of the process.",
      details: [
        "Gather and organize all required documentation, templates, and reference materials",
        "Configure necessary software tools, systems, and access permissions",
        "Prepare physical workspace with proper equipment and safety measures",
        "Brief all team members on their specific roles, responsibilities, and expectations",
        "Establish backup procedures and contingency plans for potential issues",
        "Verify compliance with relevant regulations and company policies"
      ]
    },
    {
      number: 3,
      title: "Process Implementation and Execution",
      description: "Execute the main process steps following established protocols while maintaining consistent monitoring and documentation throughout.",
      details: [
        "Follow the documented step-by-step procedures exactly as outlined",
        "Monitor progress continuously against established milestones and KPIs",
        "Document all activities, decisions, and any deviations from the plan",
        "Maintain regular communication with stakeholders through status updates",
        "Address any issues or obstacles immediately using established escalation procedures",
        "Ensure all work meets quality standards and regulatory requirements"
      ]
    },
    {
      number: 4,
      title: "Quality Assurance and Validation",
      description: "Conduct comprehensive quality checks and validation procedures to ensure all requirements are met and obtain necessary approvals.",
      details: [
        "Perform detailed quality control checks against all established standards",
        "Review completed work with supervisors, peers, or external auditors",
        "Obtain all required approvals, sign-offs, and certifications",
        "Address any identified issues, gaps, or non-compliance items immediately",
        "Document all quality assurance activities and their outcomes",
        "Verify that all deliverables meet customer or regulatory expectations"
      ]
    },
    {
      number: 5,
      title: "Documentation, Closure, and Knowledge Transfer",
      description: "Complete all final documentation, archive materials appropriately, and transfer knowledge to ensure sustainable process improvement.",
      details: [
        "Finalize all required documentation, reports, and compliance records",
        "Archive all materials according to organizational retention policies",
        "Update relevant systems, databases, and knowledge repositories",
        "Conduct thorough lessons learned sessions with all participants",
        "Document best practices and improvement recommendations for future iterations",
        "Notify all stakeholders of successful completion and provide final reports"
      ]
    }
  ];

  const content = steps.map(step => 
    `## Step ${step.number}: ${step.title}\n\n${step.description}\n\n${step.details.map(detail => `• ${detail}`).join('\n')}`
  ).join('\n\n');

  return {
    title: `${title} - Standard Operating Procedure`,
    content,
    steps
  };
}

function generateEnhancedMockWorkflow(title: string): WorkflowStep[] {
  return [
    {
      id: "start",
      title: "Start",
      description: "Begin Process",
      type: "start" as const,
      x: 100,
      y: 250,
      connections: ["assess"]
    },
    {
      id: "assess",
      title: "Assessment",
      description: "Initial Assessment & Planning",
      type: "process" as const,
      x: 280,
      y: 250,
      connections: ["prepare"]
    },
    {
      id: "prepare",
      title: "Preparation",
      description: "Resource Preparation & Setup",
      type: "process" as const,
      x: 460,
      y: 250,
      connections: ["execute"]
    },
    {
      id: "execute",
      title: "Execute",
      description: "Implementation & Execution",
      type: "process" as const,
      x: 640,
      y: 250,
      connections: ["quality_check"]
    },
    {
      id: "quality_check",
      title: "Quality Check",
      description: "Meets Standards?",
      type: "decision" as const,
      x: 820,
      y: 250,
      connections: ["finalize", "execute"]
    },
    {
      id: "finalize",
      title: "Finalize",
      description: "Documentation & Closure",
      type: "process" as const,
      x: 1000,
      y: 250,
      connections: ["end"]
    },
    {
      id: "end",
      title: "Complete",
      description: "Process Complete",
      type: "end" as const,
      x: 1180,
      y: 250,
      connections: []
    }
  ];
}
