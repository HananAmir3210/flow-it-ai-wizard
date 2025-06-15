
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Database } from '@/integrations/supabase/types';

type Workflow = Database['public']['Tables']['workflows']['Row'];

interface EditWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: Workflow | null;
  onSubmit: (data: { title: string; description: string }) => void;
}

const EditWorkflowModal: React.FC<EditWorkflowModalProps> = ({
  isOpen,
  onClose,
  workflow,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (workflow) {
      setTitle(workflow.title);
      setDescription(workflow.description || '');
    }
  }, [workflow]);

  if (!isOpen || !workflow) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title: title.trim(), description: description.trim() });
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Edit Workflow</h2>
          <Button variant="outline" size="sm" onClick={handleClose}>
            <X size={16} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="edit-workflow-title">Title *</Label>
            <Input
              id="edit-workflow-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter workflow title"
              required
            />
          </div>

          <div>
            <Label htmlFor="edit-workflow-description">Description</Label>
            <Textarea
              id="edit-workflow-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter workflow description"
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Update Workflow
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkflowModal;
