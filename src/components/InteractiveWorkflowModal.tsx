
import React, { useCallback, useState, useMemo } from 'react';
import { X, Download, Save, Plus, Settings, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  NodeTypes,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface WorkflowStep {
  id: string;
  title: string;
  type: 'start' | 'process' | 'decision' | 'end';
  next?: string[];
}

interface InteractiveWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: WorkflowStep[];
  title: string;
}

// Custom node component
const CustomNode = ({ data }: { data: any }) => {
  const getNodeStyle = (type: string) => {
    switch (type) {
      case 'start':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'process':
        return 'bg-blue-100 border-blue-500 text-blue-800';
      case 'decision':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'end':
        return 'bg-red-100 border-red-500 text-red-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  return (
    <div className={`px-4 py-2 rounded-lg border-2 ${getNodeStyle(data.type)} min-w-[120px] text-center`}>
      <div className="font-medium text-sm">{data.label}</div>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const InteractiveWorkflowModal: React.FC<InteractiveWorkflowModalProps> = ({ 
  isOpen, 
  onClose, 
  steps, 
  title 
}) => {
  if (!isOpen) return null;

  // Convert workflow steps to React Flow format
  const initialNodes: Node[] = useMemo(() => 
    steps.map((step, index) => ({
      id: step.id,
      type: 'custom',
      position: { x: 100, y: index * 150 + 50 },
      data: { 
        label: step.title, 
        type: step.type 
      },
    })), [steps]
  );

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    steps.forEach((step) => {
      if (step.next) {
        step.next.forEach((nextId) => {
          edges.push({
            id: `${step.id}-${nextId}`,
            source: step.id,
            target: nextId,
            type: 'smoothstep',
            animated: true,
          });
        });
      }
    });
    return edges;
  }, [steps]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewNode = () => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: { label: 'New Step', type: 'process' },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveWorkflow = () => {
    console.log('Saving workflow...', { nodes, edges });
  };

  const exportWorkflow = () => {
    console.log('Exporting workflow...');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const modalClasses = isFullscreen 
    ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" 
    : "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4";

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden";

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
          <div>
            <h2 className="text-xl font-bold dark:text-white">{title} - Interactive Workflow Editor</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Drag, edit, and customize your workflow</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={addNewNode}>
              <Plus size={16} />
              Add Step
            </Button>
            <Button variant="outline" size="sm" onClick={saveWorkflow}>
              <Save size={16} />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={exportWorkflow}>
              <Download size={16} />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              <Maximize2 size={16} />
              {isFullscreen ? 'Exit' : 'Fullscreen'}
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className={isFullscreen ? "h-[calc(100vh-80px)]" : "h-[600px]"}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls />
            <MiniMap 
              nodeStrokeColor="#374151"
              nodeColor="#6B7280"
              nodeBorderRadius={2}
            />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Footer */}
        {!isFullscreen && (
          <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                💡 Drag nodes to rearrange • Click + drag from edges to connect • Double-click nodes to edit
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportWorkflow}>
                  Export PNG
                </Button>
                <Button size="sm" onClick={onClose}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveWorkflowModal;
