
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Template-based SOP generator
function generateSOPFromTemplate(goal: string, department: string, tools: string, format: string, tone: string) {
  const isNumberedFormat = format.includes('numbered');
  const stepPrefix = isNumberedFormat ? (i: number) => `${i}. ` : () => '• ';
  
  const sections = {
    objective: `## Objective\nThis SOP outlines the process for: ${goal}\n\nThis procedure is designed for the ${department} department to ensure consistency, efficiency, and quality in execution.`,
    
    prerequisites: `## Prerequisites and Requirements\n${stepPrefix(1)}Access to ${tools || 'necessary tools and systems'}\n${stepPrefix(2)}Basic understanding of ${department.toLowerCase()} processes\n${stepPrefix(3)}Appropriate user permissions and access rights\n${stepPrefix(4)}Required documentation and reference materials`,
    
    roles: `## Roles and Responsibilities\n\n**Process Owner:** ${department} team member responsible for execution\n**Supervisor:** Reviews and approves completed work\n**Quality Assurance:** Monitors adherence to standards\n**Stakeholders:** Provide input and feedback as needed`,
    
    workflow: generateWorkflowSteps(goal, department, tools, stepPrefix),
    
    outputs: `## Expected Outputs and Deliverables\n${stepPrefix(1)}Completed ${goal.toLowerCase()} documentation\n${stepPrefix(2)}Quality assurance checklist\n${stepPrefix(3)}Status reports for stakeholders\n${stepPrefix(4)}Updated process metrics and KPIs`,
    
    bestPractices: `## Best Practices and Tips\n${stepPrefix(1)}Always document your progress at each step\n${stepPrefix(2)}Communicate any issues or blockers immediately\n${stepPrefix(3)}Follow established quality standards\n${stepPrefix(4)}Keep stakeholders informed of major milestones\n${stepPrefix(5)}Review and validate work before proceeding to next step`,
    
    troubleshooting: `## Common Issues and Troubleshooting\n${stepPrefix(1)}**Issue:** Access denied to required tools\n   **Solution:** Contact IT support or supervisor for proper permissions\n\n${stepPrefix(2)}**Issue:** Missing information or unclear requirements\n   **Solution:** Reach out to stakeholders for clarification\n\n${stepPrefix(3)}**Issue:** Process delays or bottlenecks\n   **Solution:** Escalate to supervisor and document delays`,
    
    flowchart: `## Process Flow Summary\n\`\`\`\nStart → Assessment → Planning → Implementation → Review → Complete\n  ↓         ↓          ↓             ↓              ↓\nInputs → Analysis → Resources → Execution → Validation → Outputs\n\`\`\``
  };

  return Object.values(sections).join('\n\n');
}

function generateWorkflowSteps(goal: string, department: string, tools: string, stepPrefix: (i: number) => string) {
  const commonSteps = [
    'Initial assessment and planning',
    'Gather required resources and information',
    'Set up necessary tools and access',
    'Execute primary tasks',
    'Monitor progress and quality',
    'Review and validate results',
    'Document completion and outcomes',
    'Communicate results to stakeholders'
  ];

  const customizedSteps = commonSteps.map((step, index) => {
    let customStep = step;
    
    // Customize steps based on goal and department
    if (step.includes('tools') && tools) {
      customStep = `Set up ${tools} and verify access permissions`;
    } else if (step.includes('primary tasks')) {
      customStep = `Execute ${goal.toLowerCase()} according to ${department.toLowerCase()} standards`;
    } else if (step.includes('stakeholders')) {
      customStep = `Communicate results to ${department.toLowerCase()} team and relevant stakeholders`;
    }
    
    return `${stepPrefix(index + 1)}**${customStep.charAt(0).toUpperCase() + customStep.slice(1)}**\n   - Review requirements and objectives\n   - Allocate necessary time and resources\n   - Follow established protocols and guidelines\n   - Document any deviations or issues encountered`;
  });

  return `## Step-by-Step Workflow\n\n${customizedSteps.join('\n\n')}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goal, department, tools, format, tone } = await req.json();

    if (!goal || !department) {
      return new Response(
        JSON.stringify({ error: 'Goal and department are required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating SOP with template for:', { goal, department, tools, format, tone });

    // Generate SOP using template
    const generatedSOP = generateSOPFromTemplate(
      goal,
      department,
      tools || 'standard office tools',
      format || 'numbered steps',
      tone || 'Professional and instructional'
    );

    console.log('SOP generated successfully');

    return new Response(
      JSON.stringify({ generatedSOP }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-sop function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
