
export interface SOPResponse {
  sop: {
    title: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      details?: string[];
    }>;
  };
  workflow: Array<{
    id: string;
    title: string;
    type: 'start' | 'process' | 'decision' | 'end';
    next?: string[];
  }>;
}

export async function generateSOPFromPrompt(prompt: string): Promise<SOPResponse> {
  // Simulate API call for now - replace with actual OpenAI API call
  console.log("Generating SOP for prompt:", prompt);
  
  // Simulate loading delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const mockResponse: SOPResponse = {
    sop: {
      title: `${prompt.charAt(0).toUpperCase() + prompt.slice(1)} SOP`,
      steps: [
        {
          number: 1,
          title: "Initial Assessment",
          description: "Analyze current state and requirements",
          details: ["Gather stakeholder input", "Document current processes", "Identify pain points"]
        },
        {
          number: 2,
          title: "Planning Phase",
          description: "Create detailed implementation plan",
          details: ["Set timeline", "Allocate resources", "Define success metrics"]
        },
        {
          number: 3,
          title: "Implementation",
          description: "Execute the planned changes",
          details: ["Deploy solutions", "Train team members", "Monitor progress"]
        },
        {
          number: 4,
          title: "Review & Optimize",
          description: "Evaluate results and make improvements",
          details: ["Collect feedback", "Measure outcomes", "Iterate on process"]
        }
      ]
    },
    workflow: [
      { id: '1', title: 'Start', type: 'start', next: ['2'] },
      { id: '2', title: 'Assessment', type: 'process', next: ['3'] },
      { id: '3', title: 'Planning', type: 'process', next: ['4'] },
      { id: '4', title: 'Implementation', type: 'process', next: ['5'] },
      { id: '5', title: 'Review', type: 'process', next: ['6'] },
      { id: '6', title: 'Complete', type: 'end' }
    ]
  };
  
  return mockResponse;
}
