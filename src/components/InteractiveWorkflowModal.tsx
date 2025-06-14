import React, { useCallback, useState, useMemo } from 'react';
import { X, Plus, Square, Circle, ArrowRight, Highlighter, Palette, Maximize, Minimize, ZoomIn, ZoomOut, Download } from 'lucide-react';
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
  MarkerType,
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
  const [label, setLabel] = useState(data?.label || 'New Node');
  const { setNodes } = useReactFlow();

  const getNodeStyle = (type: string, highlighted: boolean, color: string) => {
    const baseStyle = highlighted ? 'ring-2 ring-yellow-400 ' : '';
    const colorClasses = color ? {
      red: 'bg-red-100 border-red-500 text-red-800',
      blue: 'bg-blue-100 border-blue-500 text-blue-800',
      green: 'bg-green-100 border-green-500 text-green-800',
      yellow: 'bg-yellow-100 border-yellow-500 text-yellow-800',
      purple: 'bg-purple-100 border-purple-500 text-purple-800',
      pink: 'bg-pink-100 border-pink-500 text-pink-800',
      orange: 'bg-orange-100 border-orange-500 text-orange-800',
      indigo: 'bg-indigo-100 border-indigo-500 text-indigo-800'
    }[color] : '';
    
    if (colorClasses) {
      return baseStyle + colorClasses;
    }
    
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
      setLabel(data?.label || 'New Node');
    }
  };

  return (
    <div 
      className={`px-4 py-2 border-2 min-w-[120px] min-h-[40px] text-center cursor-pointer ${getNodeStyle(data?.type || 'process', data?.highlighted || false, data?.color)} ${
        data?.type === 'circle' ? 'rounded-full' : data?.type === 'square' ? 'rounded-none' : 'rounded-lg'
      }`}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
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
  steps = [], 
  title = "Workflow Editor"
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  // Convert workflow steps to React Flow format with safety checks - fixed hook order
  const initialNodes: Node[] = useMemo(() => {
    const safeSteps = steps || [];
    
    if (safeSteps.length === 0) {
      return [{
        id: 'default-1',
        type: 'custom',
        position: { x: 100, y: 100 },
        data: { 
          label: 'Start Here', 
          type: 'start',
          highlighted: false,
          color: null
        },
      }];
    }
    
    return safeSteps.map((step, index) => ({
      id: step.id,
      type: 'custom',
      position: { x: 100, y: index * 150 + 50 },
      data: { 
        label: step.title || `Step ${index + 1}`, 
        type: step.type || 'process',
        highlighted: false,
        color: null
      },
    }));
  }, [steps]);

  const initialEdges: Edge[] = useMemo(() => {
    const safeSteps = steps || [];
    const edges: Edge[] = [];
    
    safeSteps.forEach((step) => {
      if (step.next) {
        step.next.forEach((nextId) => {
          edges.push({
            id: `${step.id}-${nextId}`,
            source: step.id,
            target: nextId,
            type: 'smoothstep',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
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
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = [
    { name: 'red', value: '#ef4444' },
    { name: 'blue', value: '#3b82f6' },
    { name: 'green', value: '#10b981' },
    { name: 'yellow', value: '#f59e0b' },
    { name: 'purple', value: '#8b5cf6' },
    { name: 'pink', value: '#ec4899' },
    { name: 'orange', value: '#f97316' },
    { name: 'indigo', value: '#6366f1' }
  ];

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
    setSelectedNodes(nodes.map(node => node.id));
  }, []);

  const addNewNode = (type: 'process' | 'circle' | 'square' = 'process') => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 },
      data: { 
        label: type === 'process' ? 'New Step' : type.charAt(0).toUpperCase() + type.slice(1), 
        type: type,
        highlighted: false,
        color: null
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

  const deleteSelectedNodes = () => {
    setNodes((nds) => nds.filter(node => !selectedNodes.includes(node.id)));
    setEdges((eds) => eds.filter(edge => 
      !selectedNodes.includes(edge.source) && !selectedNodes.includes(edge.target)
    ));
    setSelectedNodes([]);
  };

  const toggleConnecting = () => {
    setIsConnecting(!isConnecting);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(2, zoom + 0.1));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.1));
  };

  const handleDownload = () => {
    console.log('Downloading workflow...');
    // TODO: Implement download functionality
  };

  const changeNodeColor = (colorName: string) => {
    setNodes((nds) => 
      nds.map(node => 
        selectedNodes.includes(node.id) 
          ? { ...node, data: { ...node.data, color: colorName } }
          : node
      )
    );
    setShowColorPicker(false);
  };

  const modalClasses = isFullScreen 
    ? "fixed inset-0 z-50 bg-white dark:bg-gray-800" 
    : "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4";

  const contentClasses = isFullScreen
    ? "w-full h-full flex flex-col"
    : "bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col";

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        {/* Title Section */}
        <div className="p-6 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
          <div className="text-center">
            <h1 className="text-2xl font-bold dark:text-white mb-2">
              {title}
            </h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              SOP – Interactive Workflow Editor
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Drag, edit, and customize your workflow • Double-click to edit text
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-center gap-2 p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex-shrink-0 flex-wrap">
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
            onClick={deleteSelectedNodes}
            disabled={selectedNodes.length === 0}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowColorPicker(!showColorPicker)}
              disabled={selectedNodes.length === 0}
              className="flex items-center gap-2"
            >
              <Palette size={16} />
              Color
            </Button>
            {showColorPicker && (
              <div className="absolute top-full mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-3 z-10 min-w-[160px]">
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => changeNodeColor(color.name)}
                      className="w-8 h-8 rounded border-2 border-gray-300 hover:scale-110 transition-transform relative group"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border rounded-md">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleZoomOut}
              className="h-8 px-2 flex items-center gap-1"
            >
              <ZoomOut size={16} />
            </Button>
            <span className="text-sm px-2 min-w-[50px] text-center">{Math.round(zoom * 100)}%</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleZoomIn}
              className="h-8 px-2 flex items-center gap-1"
            >
              <ZoomIn size={16} />
            </Button>
          </div>

          {/* Download Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </Button>
          
          {/* Full Screen Toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFullScreen}
            className="flex items-center gap-2"
          >
            {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
            {isFullScreen ? 'Exit' : 'Fullscreen'}
          </Button>
          
          {/* Close Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClose}
            className="ml-auto flex items-center gap-2"
          >
            <X size={16} />
            Close
          </Button>
        </div>

        {/* Workflow Canvas */}
        <div className={`overflow-hidden flex-1 ${isFullScreen ? 'h-full' : 'h-[500px]'}`}>
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
            panOnDrag={!isConnecting}
            nodesDraggable={!isConnecting}
            elementsSelectable={true}
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
        {!isFullScreen && (
          <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700 flex-shrink-0">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              💡 Double-click nodes to edit • Drag to rearrange • Shift+click to select multiple • Click Arrow then drag from node edges to connect • Select nodes and use Color to change appearance
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveWorkflowModal;
