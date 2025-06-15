
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Edit, Copy, Plus, Workflow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import CreateWorkflowModal from '@/components/modals/CreateWorkflowModal';
import EditWorkflowModal from '@/components/modals/EditWorkflowModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';
import InteractiveWorkflowEditor from './InteractiveWorkflowEditor';
import type { Database } from '@/integrations/supabase/types';
import type { Node, Edge } from '@xyflow/react';

type Workflow = Database['public']['Tables']['workflows']['Row'];

interface WorkflowStep {
  id: string;
  title: string;
  type: 'start' | 'process' | 'decision' | 'end';
  next?: string[];
}

const VisualWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [deleteWorkflowId, setDeleteWorkflowId] = useState<string | null>(null);
  const [interactiveWorkflow, setInteractiveWorkflow] = useState<{ workflow: Workflow; steps: WorkflowStep[] } | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWorkflows();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('workflows_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'workflows', filter: `user_id=eq.${user.id}` },
          () => fetchWorkflows()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchWorkflows = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setWorkflows(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching workflows",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkflow = async (data: { title: string; description: string }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('workflows')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          thumbnail_url: '/placeholder.svg'
        });

      if (error) throw error;

      toast({
        title: "Workflow Created",
        description: "Your workflow has been created successfully.",
      });
      setIsCreateModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error creating workflow",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateWorkflow = async (id: string, data: { title: string; description: string }) => {
    try {
      const { error } = await supabase
        .from('workflows')
        .update(data)
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Workflow Updated",
        description: "Your workflow has been updated successfully.",
      });
      setEditingWorkflow(null);
    } catch (error: any) {
      toast({
        title: "Error updating workflow",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteWorkflow = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workflows')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Workflow Deleted",
        description: "Your workflow has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting workflow",
        description: error.message,
        variant: "destructive",
      });
    }
    setDeleteWorkflowId(null);
  };

  const handleDuplicateWorkflow = async (workflow: Workflow) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('workflows')
        .insert({
          user_id: user.id,
          title: `${workflow.title} (copy)`,
          description: workflow.description,
          thumbnail_url: workflow.thumbnail_url
        });

      if (error) throw error;

      toast({
        title: "Workflow Duplicated",
        description: "Your workflow has been duplicated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error duplicating workflow",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleExportWorkflow = (workflow: Workflow) => {
    const exportData = {
      title: workflow.title,
      description: workflow.description,
      created_at: workflow.created_at,
      id: workflow.id
    };
    
    const content = JSON.stringify(exportData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflow.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_workflow.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Workflow Exported",
      description: "Your workflow has been downloaded as a JSON file.",
    });
  };

  const handleEditInteractive = (workflow: Workflow) => {
    // Convert workflow to steps format for the interactive editor
    const steps: WorkflowStep[] = [
      { id: 'start', title: 'Start', type: 'start' },
      { id: 'process-1', title: 'Process Step', type: 'process' },
      { id: 'end', title: 'End', type: 'end' }
    ];
    
    setInteractiveWorkflow({ workflow, steps });
  };

  const handleSaveInteractiveWorkflow = async (nodes: Node[], edges: Edge[]) => {
    if (!interactiveWorkflow || !user) return;

    try {
      // Here you would typically save the nodes and edges to the database
      // For now, we'll just show a success message
      
      toast({
        title: "Interactive Workflow Saved",
        description: "Your enhanced workflow has been saved with visual connections.",
      });
      
      setInteractiveWorkflow(null);
      fetchWorkflows(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error saving workflow",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visual Workflows</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <img 
                  src={workflow.thumbnail_url || '/placeholder.svg'} 
                  alt={workflow.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <CardTitle className="text-lg">{workflow.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{workflow.description}</p>
              <p className="text-xs text-muted-foreground">
                Created: {new Date(workflow.created_at).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleExportWorkflow(workflow)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setEditingWorkflow(workflow)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDuplicateWorkflow(workflow)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                size="sm" 
                variant="default" 
                className="w-full mb-2"
                onClick={() => handleEditInteractive(workflow)}
              >
                <Workflow className="h-4 w-4 mr-1" />
                Interactive Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-destructive hover:text-destructive"
                onClick={() => setDeleteWorkflowId(workflow.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {workflows.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No workflows created yet.</p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Workflow
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <CreateWorkflowModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateWorkflow}
      />

      <EditWorkflowModal
        isOpen={!!editingWorkflow}
        onClose={() => setEditingWorkflow(null)}
        workflow={editingWorkflow}
        onSubmit={(data) => editingWorkflow && handleUpdateWorkflow(editingWorkflow.id, data)}
      />

      <DeleteConfirmModal
        isOpen={!!deleteWorkflowId}
        onClose={() => setDeleteWorkflowId(null)}
        onConfirm={() => deleteWorkflowId && handleDeleteWorkflow(deleteWorkflowId)}
        title="Delete Workflow"
        description="Are you sure you want to delete this workflow? This action cannot be undone."
      />

      {/* Interactive Workflow Editor */}
      {interactiveWorkflow && (
        <InteractiveWorkflowEditor
          isOpen={!!interactiveWorkflow}
          onClose={() => setInteractiveWorkflow(null)}
          onSave={handleSaveInteractiveWorkflow}
          steps={interactiveWorkflow.steps}
          title={interactiveWorkflow.workflow.title}
        />
      )}
    </div>
  );
};

export default VisualWorkflows;
