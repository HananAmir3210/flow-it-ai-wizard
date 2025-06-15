
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
      content = generateEnhancedSOPContent(prompt);
    } else if (type === 'workflow') {
      content = generateEnhancedWorkflowContent(prompt);
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

function generateEnhancedSOPContent(prompt: string) {
  // Extract title from prompt for more relevant content
  const titleMatch = prompt.match(/for: "([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : "Process";
  
  return {
    title: `${title} - Standard Operating Procedure`,
    content: `## Overview\nThis SOP provides detailed guidance for ${title.toLowerCase()}.\n\n## Process Steps\n\n### Step 1: Initial Assessment and Planning\nConduct thorough assessment and develop comprehensive plan.\n\n### Step 2: Resource Preparation and Setup\nPrepare all necessary resources and create optimal environment.\n\n### Step 3: Process Implementation\nExecute main process steps following established protocols.\n\n### Step 4: Quality Assurance\nConduct comprehensive quality checks and validation.\n\n### Step 5: Documentation and Closure\nComplete final documentation and knowledge transfer.`,
    steps: [
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
    ]
  };
}

function generateEnhancedWorkflowContent(prompt: string) {
  return [
    {
      id: "start",
      title: "Start",
      description: "Begin Process",
      type: "start",
      x: 100,
      y: 250,
      connections: ["assess"]
    },
    {
      id: "assess",
      title: "Assessment",
      description: "Initial Assessment & Planning",
      type: "process",
      x: 280,
      y: 250,
      connections: ["prepare"]
    },
    {
      id: "prepare",
      title: "Preparation",
      description: "Resource Preparation & Setup",
      type: "process",
      x: 460,
      y: 250,
      connections: ["execute"]
    },
    {
      id: "execute",
      title: "Execute",
      description: "Implementation & Execution",
      type: "process",
      x: 640,
      y: 250,
      connections: ["quality_check"]
    },
    {
      id: "quality_check",
      title: "Quality Check",
      description: "Meets Standards?",
      type: "decision",
      x: 820,
      y: 250,
      connections: ["finalize", "execute"]
    },
    {
      id: "finalize",
      title: "Finalize",
      description: "Documentation & Closure",
      type: "process",
      x: 1000,
      y: 250,
      connections: ["end"]
    },
    {
      id: "end",
      title: "Complete",
      description: "Process Complete",
      type: "end",
      x: 1180,
      y: 250,
      connections: []
    }
  ];
}
