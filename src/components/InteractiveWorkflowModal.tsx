
import React, { useCallback, useState, useMemo } from 'react';
import { X, Download, Save, Plus, Settings, ZoomIn, ZoomOut, Maximize2, Square, Circle, ArrowRight, Highlighter, Trash2 } from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

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

  const deleteSelectedNodes = () => {
    setNodes((nds) => nds.filter(node => !selectedNodes.includes(node.id)));
    setEdges((eds) => eds.filter(edge => 
      !selectedNodes.includes(edge.source) && !selectedNodes.includes(edge.target)
    ));
    setSelectedNodes([]);
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
            <p className="text-sm text-gray-600 dark:text-gray-300">Drag, edit, and customize your workflow • Double-click to edit text</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => addNewNode('process')}>
              <Plus size={16} />
              Step
            </Button>
            <Button variant="outline" size="sm" onClick={() => addNewNode('circle')}>
              <Circle size={16} />
              Circle
            </Button>
            <Button variant="outline" size="sm" onClick={() => addNewNode('square')}>
              <Square size={16} />
              Square
            </Button>
            <Button variant="outline" size="sm" onClick={() => addNewNode('arrow')}>
              <ArrowRight size={16} />
              Arrow
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleHighlight}
              disabled={selectedNodes.length === 0}
            >
              <Highlighter size={16} />
              Highlight
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={deleteSelectedNodes}
              disabled={selectedNodes.length === 0}
            >
              <Trash2 size={16} />
              Delete
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
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            multiSelectionKeyCode="Shift"
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
                💡 Double-click nodes to edit • Drag to rearrange • Shift+click to select multiple • Click + drag from edges to connect
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
