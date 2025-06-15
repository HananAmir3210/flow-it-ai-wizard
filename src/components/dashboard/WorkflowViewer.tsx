
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Workflow } from 'lucide-react';
import InteractiveWorkflowModal from '@/components/InteractiveWorkflowModal';

interface WorkflowStep {
  id: string;
  title: string;
  type: 'start' | 'process' | 'decision' | 'end';
  next?: string[];
}

interface WorkflowViewerProps {
  steps: WorkflowStep[];
  title: string;
  showEditButton?: boolean;
  className?: string;
}

const WorkflowViewer: React.FC<WorkflowViewerProps> = ({
  steps,
  title,
  showEditButton = true,
  className = ''
}) => {
  const [isInteractiveModalOpen, setIsInteractiveModalOpen] = useState(false);

  const handleInteractiveEdit = () => {
    setIsInteractiveModalOpen(true);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Workflow Visualization</h3>
        {showEditButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleInteractiveEdit}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Interactive Edit
          </Button>
        )}
      </div>
      
      <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Workflow className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">
            {showEditButton 
              ? 'Click "Interactive Edit" to visualize and edit this workflow'
              : 'Workflow visualization available'
            }
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Steps: {steps.length}
          </p>
        </div>
      </div>

      {/* Interactive Workflow Modal */}
      <InteractiveWorkflowModal
        isOpen={isInteractiveModalOpen}
        onClose={() => setIsInteractiveModalOpen(false)}
        steps={steps}
        title={`${title} - Workflow Editor`}
      />
    </div>
  );
};

export default WorkflowViewer;
