
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Edit, Copy, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const workflowsData = [
  {
    id: 1,
    title: 'Customer Support Workflow',
    description: 'Visual process for handling customer inquiries',
    dateCreated: '2024-01-12',
    thumbnail: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Employee Onboarding Flow',
    description: 'Step-by-step onboarding process visualization',
    dateCreated: '2024-01-08',
    thumbnail: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Product Launch Workflow',
    description: 'Complete product launch process diagram',
    dateCreated: '2024-01-05',
    thumbnail: '/placeholder.svg',
  },
];

const VisualWorkflows = () => {
  const { toast } = useToast();

  const handleCreateNew = () => {
    console.log('Creating new workflow...');
    toast({
      title: "Create New Workflow",
      description: "Opening workflow designer...",
    });
  };

  const handleExport = (workflowId: number, title: string) => {
    console.log('Exporting workflow:', workflowId);
    toast({
      title: "Exporting Workflow",
      description: `"${title}" is being exported...`,
    });
  };

  const handleEdit = (workflowId: number, title: string) => {
    console.log('Editing workflow:', workflowId);
    toast({
      title: "Edit Mode",
      description: `Opening "${title}" in editor...`,
    });
  };

  const handleCopy = (workflowId: number, title: string) => {
    console.log('Copying workflow:', workflowId);
    toast({
      title: "Workflow Copied",
      description: `"${title}" has been duplicated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visual Workflows</h1>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflowsData.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <img 
                  src={workflow.thumbnail} 
                  alt={workflow.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <CardTitle className="text-lg">{workflow.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{workflow.description}</p>
              <p className="text-xs text-muted-foreground">
                Created: {new Date(workflow.dateCreated).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleExport(workflow.id, workflow.title)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleEdit(workflow.id, workflow.title)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCopy(workflow.id, workflow.title)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workflowsData.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No workflows created yet. Start by generating your first workflow!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisualWorkflows;
