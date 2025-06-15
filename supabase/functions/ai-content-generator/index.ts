
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, type } = await req.json()
    
    console.log(`Generating ${type} content for prompt:`, prompt.substring(0, 100) + '...');

    // For now, return structured mock data based on the type
    let content;
    
    if (type === 'sop') {
      content = generateMockSOPContent(prompt);
    } else if (type === 'workflow') {
      content = generateMockWorkflowContent(prompt);
    } else {
      throw new Error('Invalid content type');
    }

    return new Response(
      JSON.stringify({ content }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in ai-content-generator:', error)
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
})

function generateMockSOPContent(prompt: string) {
  // Extract title from prompt for more relevant content
  const titleMatch = prompt.match(/for: "([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : "Process";
  
  return {
    title: `${title} - Standard Operating Procedure`,
    content: `## Overview\nThis SOP provides detailed guidance for ${title.toLowerCase()}.\n\n## Process Steps\n\n### Step 1: Initial Setup\nPrepare all necessary resources and documentation.\n\n### Step 2: Execution\nCarry out the main process activities.\n\n### Step 3: Quality Check\nValidate all work meets required standards.\n\n### Step 4: Completion\nFinalize documentation and communicate results.`,
    steps: [
      {
        number: 1,
        title: "Initial Setup and Preparation",
        description: `Prepare all necessary resources and documentation for ${title.toLowerCase()}.`,
        details: [
          "Gather required materials and tools",
          "Review relevant policies and procedures",
          "Set up workspace and environment",
          "Brief team members on their roles"
        ]
      },
      {
        number: 2,
        title: "Process Execution",
        description: "Carry out the main process activities according to established protocols.",
        details: [
          "Follow step-by-step procedures",
          "Monitor progress and quality",
          "Document all activities",
          "Address issues as they arise"
        ]
      },
      {
        number: 3,
        title: "Quality Assurance",
        description: "Validate that all work meets required standards and specifications.",
        details: [
          "Perform quality control checks",
          "Review work against standards",
          "Obtain necessary approvals",
          "Document quality assurance activities"
        ]
      },
      {
        number: 4,
        title: "Completion and Documentation",
        description: "Finalize all documentation and communicate results to stakeholders.",
        details: [
          "Complete final documentation",
          "Archive materials appropriately",
          "Communicate results to stakeholders",
          "Conduct lessons learned review"
        ]
      }
    ]
  };
}

function generateMockWorkflowContent(prompt: string) {
  return [
    {
      id: "start",
      title: "Start",
      description: "Begin Process",
      type: "start",
      x: 100,
      y: 200,
      connections: ["setup"]
    },
    {
      id: "setup",
      title: "Setup",
      description: "Initial Setup & Preparation",
      type: "process",
      x: 300,
      y: 200,
      connections: ["execute"]
    },
    {
      id: "execute",
      title: "Execute",
      description: "Process Execution",
      type: "process",
      x: 500,
      y: 200,
      connections: ["check"]
    },
    {
      id: "check",
      title: "Quality Check",
      description: "Meets Standards?",
      type: "decision",
      x: 700,
      y: 200,
      connections: ["complete", "execute"]
    },
    {
      id: "complete",
      title: "Complete",
      description: "Finalize & Document",
      type: "process",
      x: 900,
      y: 200,
      connections: ["end"]
    },
    {
      id: "end",
      title: "End",
      description: "Process Complete",
      type: "end",
      x: 1100,
      y: 200,
      connections: []
    }
  ];
}
