
export interface SOPStep {
  number: number;
  title: string;
  description: string;
  details: string[];
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  connections: string[];
}

export interface GeneratedContent {
  sop: {
    title: string;
    content: string;
    steps: SOPStep[];
  };
  workflow: WorkflowStep[];
}

export const generateSOPContent = async (
  title: string,
  description: string,
  category: string,
  tags: string[]
): Promise<GeneratedContent> => {
  // This would typically call OpenAI API
  // For now, return enhanced mock data based on the input
  
  const mockSteps: SOPStep[] = [
    {
      number: 1,
      title: "Initial Setup and Preparation",
      description: `Prepare all necessary resources and tools for ${title.toLowerCase()}`,
      details: [
        "Gather required documentation and materials",
        "Set up workspace and necessary tools",
        "Review relevant policies and guidelines",
        "Identify key stakeholders and contacts"
      ]
    },
    {
      number: 2,
      title: "Process Execution",
      description: "Execute the main steps of the process systematically",
      details: [
        "Follow established protocols and procedures",
        "Document progress and any deviations",
        "Maintain quality standards throughout",
        "Communicate with relevant team members"
      ]
    },
    {
      number: 3,
      title: "Quality Check and Validation",
      description: "Verify that all requirements have been met",
      details: [
        "Review completed work against requirements",
        "Conduct quality assurance checks",
        "Obtain necessary approvals",
        "Address any identified issues"
      ]
    },
    {
      number: 4,
      title: "Documentation and Completion",
      description: "Finalize documentation and close the process",
      details: [
        "Complete all required documentation",
        "Archive relevant materials",
        "Update system records",
        "Notify stakeholders of completion"
      ]
    }
  ];

  // Generate workflow steps that match the SOP
  const workflowSteps: WorkflowStep[] = [
    {
      id: "start",
      title: "Start",
      description: "Begin Process",
      type: "start",
      x: 100,
      y: 100,
      connections: ["prep"]
    },
    {
      id: "prep",
      title: "Preparation",
      description: mockSteps[0].title,
      type: "process",
      x: 300,
      y: 100,
      connections: ["execute"]
    },
    {
      id: "execute",
      title: "Execute",
      description: mockSteps[1].title,
      type: "process",
      x: 500,
      y: 100,
      connections: ["check"]
    },
    {
      id: "check",
      title: "Quality Check",
      description: "Meets Requirements?",
      type: "decision",
      x: 700,
      y: 100,
      connections: ["complete", "execute"]
    },
    {
      id: "complete",
      title: "Complete",
      description: mockSteps[3].title,
      type: "process",
      x: 900,
      y: 100,
      connections: ["end"]
    },
    {
      id: "end",
      title: "End",
      description: "Process Complete",
      type: "end",
      x: 1100,
      y: 100,
      connections: []
    }
  ];

  const content = mockSteps.map(step => 
    `## Step ${step.number}: ${step.title}\n\n${step.description}\n\n${step.details.map(detail => `- ${detail}`).join('\n')}`
  ).join('\n\n');

  return {
    sop: {
      title,
      content,
      steps: mockSteps
    },
    workflow: workflowSteps
  };
};
