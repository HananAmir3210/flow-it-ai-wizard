
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
}

const CreateWorkflowModal: React.FC<CreateWorkflowModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
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
          <h2 className="text-xl font-semibold dark:text-white">Create New Workflow</h2>
          <Button variant="outline" size="sm" onClick={handleClose}>
            <X size={16} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="workflow-title">Title *</Label>
            <Input
              id="workflow-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter workflow title"
              required
            />
          </div>

          <div>
            <Label htmlFor="workflow-description">Description</Label>
            <Textarea
              id="workflow-description"
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
              Create Workflow
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkflowModal;
