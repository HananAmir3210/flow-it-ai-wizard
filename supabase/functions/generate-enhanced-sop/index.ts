
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SOPRequest {
  title: string;
  description: string;
  category: string;
  tags: string[];
  preferences?: {
    tone: 'formal' | 'casual' | 'instructional';
    outputLength: 'concise' | 'detailed';
    includeCompliance: boolean;
    language: string;
  };
}

interface SOPStep {
  number: number;
  title: string;
  description: string;
  details: string[];
  responsible_role?: string;
  tools_needed?: string[];
  estimated_time?: string;
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
    const { title, description, category, tags, preferences }: SOPRequest = await req.json()
    
    console.log('Request data:', { title, description, category, tags, preferences });

    // Use the provided OpenAI API key
    const openaiApiKey = "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";

    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Construct the expert prompt
    const toneInstruction = preferences?.tone ? `with a ${preferences.tone} tone` : 'with a professional tone';
    const lengthInstruction = preferences?.outputLength === 'detailed' ? 'detailed and comprehensive' : 'concise but complete';
    const complianceInstruction = preferences?.includeCompliance ? 'Include compliance and safety considerations where applicable.' : '';
    const languageInstruction = preferences?.language && preferences.language !== 'English' ? `Generate the response in ${preferences.language}.` : '';

    const sopPrompt = `I want you to act as an expert in process optimization and operations documentation. Based on the goal I provide, generate a detailed and actionable Standard Operating Procedure (SOP) along with a workflow diagram.

Instructions:
1. Understand the goal clearly.
2. Break down the goal into logical, step-by-step actions.
3. For each step, provide:
   - Step number
   - Step title
   - Description
   - Responsible role (if applicable)
   - Tools or resources needed
   - Estimated time

Generate a ${lengthInstruction} SOP ${toneInstruction}. ${complianceInstruction} ${languageInstruction}

Goal: ${title}
Description: ${description}
Category: ${category}
Keywords/Tags: ${tags.join(', ')}

Please return the response as a valid JSON object with this exact structure:
{
  "title": "Complete SOP Title",
  "content": "Full formatted markdown content",
  "steps": [
    {
      "number": 1,
      "title": "Step Title",
      "description": "Detailed description of what needs to be done",
      "details": ["Specific action 1", "Specific action 2"],
      "responsible_role": "Role responsible for this step",
      "tools_needed": ["Tool 1", "Tool 2"],
      "estimated_time": "Time estimate"
    }
  ]
}`;

    const workflowPrompt = `Based on the SOP "${title}" with description "${description}", create a logical workflow diagram in structured format.

Generate 5-8 workflow steps that represent the process flow, including:
- One START node
- Multiple PROCESS nodes for main activities  
- At least one DECISION node for quality checks or approvals
- One END node

Position them in a logical left-to-right flow with appropriate spacing (x positions: 100, 280, 460, 640, 820, 1000, 1180; y position: 250).

Return as a valid JSON array with this structure:
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
]`;

    console.log('Generating SOP with OpenAI...');

    let sopContent, workflowSteps;

    try {
      // Generate SOP content using OpenAI
      const sopResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert in process optimization and operations documentation. You generate detailed, actionable SOPs. Always return valid JSON responses.'
            },
            {
              role: 'user',
              content: sopPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        }),
      });

      if (!sopResponse.ok) {
        const errorData = await sopResponse.text();
        console.error('OpenAI SOP API error:', errorData);
        throw new Error(`OpenAI API error: ${sopResponse.status}`);
      }

      const sopData = await sopResponse.json();
      const sopContentRaw = sopData.choices[0].message.content;
      
      try {
        sopContent = JSON.parse(sopContentRaw);
        console.log('Successfully generated SOP content with OpenAI');
      } catch (parseError) {
        console.error('Failed to parse SOP JSON, using fallback');
        sopContent = generateEnhancedMockSOP(title, description, category, preferences);
      }

    } catch (error) {
      console.error('Failed to generate SOP with OpenAI:', error);
      sopContent = generateEnhancedMockSOP(title, description, category, preferences);
    }

    try {
      // Generate workflow using OpenAI
      const workflowResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert in workflow design. You create logical, well-structured workflow diagrams. Always return valid JSON responses.'
            },
            {
              role: 'user',
              content: workflowPrompt
            }
          ],
          temperature: 0.5,
          max_tokens: 1000
        }),
      });

      if (!workflowResponse.ok) {
        const errorData = await workflowResponse.text();
        console.error('OpenAI Workflow API error:', errorData);
        throw new Error(`OpenAI API error: ${workflowResponse.status}`);
      }

      const workflowData = await workflowResponse.json();
      const workflowContentRaw = workflowData.choices[0].message.content;
      
      try {
        workflowSteps = JSON.parse(workflowContentRaw);
        console.log('Successfully generated workflow content with OpenAI');
      } catch (parseError) {
        console.error('Failed to parse workflow JSON, using fallback');
        workflowSteps = generateEnhancedMockWorkflow(title);
      }

    } catch (error) {
      console.error('Failed to generate workflow with OpenAI:', error);
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
      const { title, description, category, preferences } = requestBody
      
      const fallbackContent = {
        sop: generateEnhancedMockSOP(title || 'Standard Operating Procedure', description || 'Process description', category || 'Operations', preferences),
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

function generateEnhancedMockSOP(title: string, description: string, category: string, preferences?: any) {
  const toneAdjustments = {
    formal: { prefix: "This document outlines the formal procedure for", language: "shall be" },
    casual: { prefix: "Here's how to handle", language: "should be" },
    instructional: { prefix: "Follow these steps to complete", language: "must be" }
  };

  const tone = toneAdjustments[preferences?.tone || 'formal'];
  const isDetailed = preferences?.outputLength === 'detailed';

  const steps: SOPStep[] = [
    {
      number: 1,
      title: "Initial Assessment and Planning",
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
      ],
      responsible_role: "Project Manager",
      tools_needed: ["Documentation templates", "Stakeholder contact list"],
      estimated_time: "2-4 hours"
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
      ],
      responsible_role: "Operations Team",
      tools_needed: ["Process checklist", "Monitoring tools", "Communication platform"],
      estimated_time: "4-8 hours"
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
      ],
      responsible_role: "Quality Assurance Manager",
      tools_needed: ["Quality checklist", "Approval forms"],
      estimated_time: "1-2 hours"
    }
  ];

  if (preferences?.includeCompliance) {
    steps.push({
      number: 4,
      title: "Compliance and Safety Verification",
      description: "Ensure all regulatory and safety requirements are met.",
      details: [
        "Verify compliance with relevant regulations",
        "Check safety protocols and requirements",
        "Document compliance verification",
        "Address any compliance gaps"
      ],
      responsible_role: "Compliance Officer",
      tools_needed: ["Compliance checklist", "Regulatory documentation"],
      estimated_time: "1-3 hours"
    });
  }

  const content = steps.map(step => 
    `## Step ${step.number}: ${step.title}\n\n${step.description}\n\n**Responsible Role:** ${step.responsible_role}\n**Estimated Time:** ${step.estimated_time}\n**Tools Needed:** ${step.tools_needed?.join(', ')}\n\n**Details:**\n${step.details.map(detail => `• ${detail}`).join('\n')}`
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
