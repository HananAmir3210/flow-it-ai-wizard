
import React, { useCallback, useState, useMemo } from 'react';
import { X, Plus, Square, Circle, ArrowRight, Highlighter } from 'lucide-react';
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
  useReactFlow,
  ConnectionMode,
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

// Custom editable node component
const EditableNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const { setNodes } = useReactFlow();

  const getNodeStyle = (type: string, highlighted: boolean) => {
    const baseStyle = highlighted ? 'ring-2 ring-yellow-400 ' : '';
    switch (type) {
      case 'start':
        return baseStyle + 'bg-green-100 border-green-500 text-green-800';
      case 'process':
        return baseStyle + 'bg-blue-100 border-blue-500 text-blue-800';
      case 'decision':
        return baseStyle + 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'end':
        return baseStyle + 'bg-red-100 border-red-500 text-red-800';
      case 'circle':
        return baseStyle + 'bg-purple-100 border-purple-500 text-purple-800 rounded-full';
      case 'square':
        return baseStyle + 'bg-gray-100 border-gray-500 text-gray-800 rounded-none';
      case 'arrow':
        return baseStyle + 'bg-orange-100 border-orange-500 text-orange-800';
      default:
        return baseStyle + 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setLabel(data.label);
    }
  };

  const getShapeContent = () => {
    if (data.type === 'arrow') {
      return (
        <div className="flex items-center justify-center">
          <ArrowRight size={20} />
          {!isEditing && <span className="ml-2">{label}</span>}
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className={`px-4 py-2 border-2 min-w-[120px] text-center cursor-pointer ${getNodeStyle(data.type, data.highlighted)} ${
        data.type === 'circle' ? 'rounded-full' : data.type === 'square' ? 'rounded-none' : 'rounded-lg'
      }`}
      onDoubleClick={handleDoubleClick}
    >
      {data.type === 'arrow' ? getShapeContent() : (
        isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSubmit}
              className="bg-transparent border-none outline-none text-center w-full"
              autoFocus
            />
          </form>
        ) : (
          <div className="font-medium text-sm">{label}</div>
        )
      )}
      {selected && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  custom: EditableNode,
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
        type: step.type,
        highlighted: false
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
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
    setSelectedNodes(nodes.map(node => node.id));
  }, []);

  const addNewNode = (type: 'process' | 'circle' | 'square' | 'arrow' = 'process') => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: { 
        label: type === 'arrow' ? 'Arrow' : 'New Step', 
        type: type,
        highlighted: false
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const toggleHighlight = () => {
    setNodes((nds) => 
      nds.map(node => 
        selectedNodes.includes(node.id) 
          ? { ...node, data: { ...node.data, highlighted: !node.data.highlighted } }
          : node
      )
    );
  };

  const toggleConnecting = () => {
    setIsConnecting(!isConnecting);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Title Section */}
        <div className="p-6 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-center">
            <h1 className="text-2xl font-bold dark:text-white mb-2">
              {title}
            </h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              SOP – Interactive Workflow Editor
            </h2>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-center gap-4 p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addNewNode('process')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Step
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addNewNode('circle')}
            className="flex items-center gap-2"
          >
            <Circle size={16} />
            Circle
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addNewNode('square')}
            className="flex items-center gap-2"
          >
            <Square size={16} />
            Square
          </Button>
          <Button 
            variant={isConnecting ? "default" : "outline"} 
            size="sm" 
            onClick={toggleConnecting}
            className="flex items-center gap-2"
          >
            <ArrowRight size={16} />
            Arrow
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleHighlight}
            disabled={selectedNodes.length === 0}
            className="flex items-center gap-2"
          >
            <Highlighter size={16} />
            Highlight
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClose}
            className="ml-auto"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Workflow Canvas */}
        <div className="h-[500px] overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            multiSelectionKeyCode="Shift"
            connectionMode={isConnecting ? ConnectionMode.Loose : ConnectionMode.Strict}
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

        {/* Footer with Instructions */}
        <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            💡 Double-click nodes to edit • Drag to rearrange • Shift+click to select multiple • Click Arrow then drag from edges to connect
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorkflowModal;
