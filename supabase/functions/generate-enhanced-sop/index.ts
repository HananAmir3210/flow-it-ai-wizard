
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

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
    const { title, description, category, tags }: SOPRequest = await req.json()

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

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Generate SOP content
    const sopResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert business process consultant specializing in creating detailed, actionable Standard Operating Procedures. Always return valid JSON responses.'
          },
          {
            role: 'user',
            content: sopPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    // Generate workflow
    const workflowResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in creating logical workflow diagrams. Always return valid JSON arrays representing workflow steps.'
          },
          {
            role: 'user',
            content: workflowPrompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1000,
      }),
    })

    if (!sopResponse.ok || !workflowResponse.ok) {
      throw new Error('Failed to generate content')
    }

    const sopData = await sopResponse.json()
    const workflowData = await workflowResponse.json()

    let sopContent
    let workflowSteps

    try {
      sopContent = JSON.parse(sopData.choices[0].message.content)
    } catch (error) {
      // Fallback to enhanced mock data if JSON parsing fails
      sopContent = generateEnhancedMockSOP(title, description, category)
    }

    try {
      workflowSteps = JSON.parse(workflowData.choices[0].message.content)
    } catch (error) {
      // Fallback to enhanced mock workflow
      workflowSteps = generateEnhancedMockWorkflow(title)
    }

    return new Response(
      JSON.stringify({
        sop: sopContent,
        workflow: workflowSteps
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error:', error)
    
    // Return enhanced mock data as fallback
    const { title, description, category } = await req.json()
    const fallbackContent = {
      sop: generateEnhancedMockSOP(title, description, category),
      workflow: generateEnhancedMockWorkflow(title)
    }

    return new Response(
      JSON.stringify(fallbackContent),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

function generateEnhancedMockSOP(title: string, description: string, category: string) {
  const steps: SOPStep[] = [
    {
      number: 1,
      title: "Initial Assessment and Planning",
      description: `Conduct thorough assessment and develop comprehensive plan for ${title.toLowerCase()}`,
      details: [
        "Review current state and identify key requirements",
        "Assess available resources and constraints",
        "Define success criteria and quality standards",
        "Create detailed project timeline and milestones",
        "Identify stakeholders and communication protocols"
      ]
    },
    {
      number: 2,
      title: "Resource Preparation and Setup",
      description: "Prepare all necessary resources, tools, and documentation",
      details: [
        "Gather required documentation and templates",
        "Set up necessary tools and systems access",
        "Prepare workspace and environmental requirements",
        "Brief team members on roles and responsibilities",
        "Establish backup procedures and contingency plans"
      ]
    },
    {
      number: 3,
      title: "Implementation and Execution",
      description: "Execute the main process following established protocols",
      details: [
        "Follow step-by-step procedures as documented",
        "Monitor progress against established milestones",
        "Document all activities and decisions made",
        "Communicate status updates to relevant stakeholders",
        "Address any deviations or issues immediately"
      ]
    },
    {
      number: 4,
      title: "Quality Assurance and Validation",
      description: "Conduct comprehensive quality checks and obtain necessary approvals",
      details: [
        "Perform quality control checks against standards",
        "Review work with senior team members or supervisors",
        "Obtain required approvals and sign-offs",
        "Address any identified issues or gaps",
        "Document quality assurance activities"
      ]
    },
    {
      number: 5,
      title: "Finalization and Documentation",
      description: "Complete final documentation and process closure activities",
      details: [
        "Finalize all required documentation and reports",
        "Archive materials according to retention policies",
        "Update relevant systems and databases",
        "Conduct lessons learned session",
        "Notify all stakeholders of completion"
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
      x: 50,
      y: 200,
      connections: ["assess"]
    },
    {
      id: "assess",
      title: "Assessment",
      description: "Initial Assessment & Planning",
      type: "process" as const,
      x: 200,
      y: 200,
      connections: ["prepare"]
    },
    {
      id: "prepare",
      title: "Preparation",
      description: "Resource Preparation & Setup",
      type: "process" as const,
      x: 350,
      y: 200,
      connections: ["execute"]
    },
    {
      id: "execute",
      title: "Execute",
      description: "Implementation & Execution",
      type: "process" as const,
      x: 500,
      y: 200,
      connections: ["quality_check"]
    },
    {
      id: "quality_check",
      title: "Quality Check",
      description: "Meets Standards?",
      type: "decision" as const,
      x: 650,
      y: 200,
      connections: ["finalize", "execute"]
    },
    {
      id: "finalize",
      title: "Finalize",
      description: "Documentation & Closure",
      type: "process" as const,
      x: 800,
      y: 200,
      connections: ["end"]
    },
    {
      id: "end",
      title: "Complete",
      description: "Process Complete",
      type: "end" as const,
      x: 950,
      y: 200,
      connections: []
    }
  ];
}
