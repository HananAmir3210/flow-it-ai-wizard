
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Copy, Download, Plus } from 'lucide-react';
import WorkflowVisualization from '../WorkflowVisualization';

const VisualWorkflows = () => {
  const workflows = [
    {
      id: 1,
      title: 'Customer Support Workflow',
      description: 'Standard process for handling customer inquiries',
      dateCreated: '2024-01-15',
      steps: [
        { id: '1', title: 'Receive Inquiry', type: 'start' as const, next: ['2'] },
        { id: '2', title: 'Categorize Issue', type: 'process' as const, next: ['3'] },
        { id: '3', title: 'Priority Level?', type: 'decision' as const, next: ['4', '5'] },
        { id: '4', title: 'Escalate to Manager', type: 'process' as const, next: ['6'] },
        { id: '5', title: 'Handle Directly', type: 'process' as const, next: ['6'] },
        { id: '6', title: 'Close Ticket', type: 'end' as const }
      ],
    },
    {
      id: 2,
      title: 'Product Launch Process',
      description: 'Complete workflow for launching new products',
      dateCreated: '2024-01-10',
      steps: [
        { id: '1', title: 'Market Research', type: 'start' as const, next: ['2'] },
        { id: '2', title: 'Product Development', type: 'process' as const, next: ['3'] },
        { id: '3', title: 'Quality Testing', type: 'process' as const, next: ['4'] },
        { id: '4', title: 'Marketing Campaign', type: 'process' as const, next: ['5'] },
        { id: '5', title: 'Launch Product', type: 'end' as const }
      ],
    },
    {
      id: 3,
      title: 'Employee Onboarding',
      description: 'Streamlined process for new employee integration',
      dateCreated: '2024-01-08',
      steps: [
        { id: '1', title: 'Send Welcome Email', type: 'start' as const, next: ['2'] },
        { id: '2', title: 'Prepare Workspace', type: 'process' as const, next: ['3'] },
        { id: '3', title: 'First Day Orientation', type: 'process' as const, next: ['4'] },
        { id: '4', title: 'Training Complete?', type: 'decision' as const, next: ['5', '3'] },
        { id: '5', title: 'Welcome Complete', type: 'end' as const }
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Visual Workflows</h1>
          <p className="text-muted-foreground">Interactive workflow diagrams for your processes</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Create Workflow</span>
        </Button>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{workflow.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created: {new Date(workflow.dateCreated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Workflow Preview */}
              <div className="mb-4 border rounded-lg overflow-hidden">
                <WorkflowVisualization 
                  steps={workflow.steps} 
                  isPreview={true}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Eye size={14} />
                  <span>View Full</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Edit size={14} />
                  <span>Edit</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Copy size={14} />
                  <span>Duplicate</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Download size={14} />
                  <span>Export</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {workflows.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🔄</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows yet</h3>
            <p className="text-gray-500 mb-4">
              Create your first visual workflow to get started
            </p>
            <Button>Create Your First Workflow</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisualWorkflows;
