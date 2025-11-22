import { useToast } from "@/hooks/use-toast";
import { AIService } from "@/services/ai/ai-service";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ReactFlow, {
  Background,
  ConnectionMode,
  Controls,
  Edge,
  MarkerType,
  Node,
  Position,
  Connection,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

interface MindFlowNode extends Node {
  data: {
    content: string;
    isRoot?: boolean;
  };
}

interface MindFlowProps {
  saveData: (data: { nodes: MindFlowNode[]; edges: Edge[]; apiKey?: string }) => Promise<void>;
  loadData: () => Promise<{ nodes?: MindFlowNode[]; edges?: Edge[]; apiKey?: string }>;
}

type EditNodeHandler = (node: MindFlowNode) => void;
type DeleteNodeHandler = (nodeId: string) => void;

const createNodeTypes = (handleEditNode: EditNodeHandler, handleDeleteNode: DeleteNodeHandler) => ({
  default: ({ data, id }: { data: { content: string; isRoot?: boolean }, id: string }) => (
    <div 
      className={`group px-4 py-2 rounded-lg shadow-md border relative ${
        data.isRoot ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex flex-col gap-1">
        <div className="text-xs text-gray-500">ID: {id}</div>
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm flex-grow">{data.content}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                handleEditNode({ id, data } as MindFlowNode);
              }}>
                <Edit2 className="h-4 w-4 mr-2" />
                编辑
              </DropdownMenuItem>
              {!data.isRoot && (
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-700 focus:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(id);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  删除
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="absolute left-0 top-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100" />
      <div className="absolute right-0 top-1/2 w-3 h-3 -mr-1.5 -mt-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100" />
    </div>
  ),
});

export function MindFlowCanvas({ saveData, loadData }: MindFlowProps) {
  const { t } = useTranslation();
  const [nodes, setNodes] = useState<MindFlowNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<MindFlowNode | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [isExpanding, setIsExpanding] = useState(false);
  const { toast } = useToast();
  const aiService = new AIService("gpt-4o-mini");
  const [newNodeContent, setNewNodeContent] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState("");
  const [nextNodeId, setNextNodeId] = useState(1);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const data = await loadData();
        if (data) {
          if (data.apiKey) {
            setApiKey(data.apiKey);
          }
          if (data.nodes) {
            setNodes(data.nodes);
          }
          if (data.edges) {
            setEdges(data.edges);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: t("mindFlow.loadingFailed"),
          description: t("mindFlow.loadDataFailed"),
          variant: "destructive",
        });
      }
    };
    loadSavedData();
  }, [loadData, t, toast]);

  useEffect(() => {
    const autoSave = async () => {
      try {
        await saveData({ 
          nodes, 
          edges
        });
        console.log('Auto saved successfully');
      } catch (error) {
        console.error("Auto save failed:", error);
      }
    };

    // 使用防抖来避免频繁保存
    const timeoutId = setTimeout(autoSave, 1000);
    return () => clearTimeout(timeoutId);
  }, [nodes, edges, apiKey, saveData]);

  const expandNode = async (direction: string) => {
    if (!selectedNode || !apiKey) {
      toast({
        title: t("mindFlow.error"),
        description: t("mindFlow.selectNodeAndApiKey"),
        variant: "destructive",
      });
      return;
    }

    setIsExpanding(true);

    try {
      const prompt = `基于以下内容："${selectedNode.data.content}"
根据方向提示："${direction}"
请生成1个相关的想法或概念。要求：
1. 想法要简洁但有深度
2. 确保与原内容有关联性
3. 严格按照以下JSON格式输出：
{
  "idea": {"content": "想法内容"}
}`;

      const response = await aiService.generateText(prompt);
      const { idea } = JSON.parse(response);

      const nodeId = (nextNodeId + 1).toString();
      const newNode: MindFlowNode = {
        id: nodeId,
        type: 'default',
        position: {
          x: selectedNode.position.x + Math.cos(Math.PI / 4) * 250,
          y: selectedNode.position.y + Math.sin(Math.PI / 4) * 250
        },
        data: { content: idea.content },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };

      const newEdge: Edge = {
        id: `${selectedNode.id}-${nodeId}`,
        source: selectedNode.id,
        target: nodeId,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      setNodes((prev) => [...prev, newNode]);
      setEdges((prev) => [...prev, newEdge]);
      setNextNodeId(nextNodeId + 1);

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: t("mindFlow.generateFailed"),
        description: t("mindFlow.cannotGenerate"),
        variant: "destructive",
      });
    } finally {
      setIsExpanding(false);
    }
  };

  const createRootNode = () => {
    if (!newNodeContent.trim()) {
      toast({
        title: t("mindFlow.error"),
        description: t("mindFlow.enterContent"),
        variant: "destructive",
      });
      return;
    }

    const newNode: MindFlowNode = {
      id: '1',
      type: 'default',
      position: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 50 },
      data: { 
        content: newNodeContent,
        isRoot: true 
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    setNodes([newNode]);
    setNewNodeContent("");
  };

  const handleEditNode = (node: MindFlowNode) => {
    setEditingContent(node.data.content);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedNode || !editingContent.trim()) return;

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, content: editingContent.trim() } }
          : node
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (window.confirm(t("mindFlow.confirmDelete"))) {
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
      setEdges((edges) => edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ));
    }
  };

  const addManualNode = () => {
    if (!selectedNode || !newNodeContent.trim()) {
      toast({
        title: t("mindFlow.error"),
        description: t("mindFlow.enterContent"),
        variant: "destructive",
      });
      return;
    }

    const nodeId = (nextNodeId + 1).toString();
    const newNode: MindFlowNode = {
      id: nodeId,
      type: 'default',
      position: {
        x: selectedNode.position.x + Math.cos(Math.PI / 4) * 250,
        y: selectedNode.position.y + Math.sin(Math.PI / 4) * 250
      },
      data: { content: newNodeContent },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    const newEdge: Edge = {
      id: `${selectedNode.id}-${nodeId}`,
      source: selectedNode.id,
      target: nodeId,
      type: 'smoothstep',
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };

    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [...prev, newEdge]);
    setNextNodeId(nextNodeId + 1);
  };

  const nodeTypes = useMemo(
    () => createNodeTypes(handleEditNode, handleDeleteNode),
    [handleEditNode, handleDeleteNode]
  );

  console.log("[nodes]", nodes, "[edges]", edges, "selectedNode", selectedNode);

  const onConnect = useCallback(
    (params: Connection) => {
      // 确保有源节点和目标节点
      if (params.source && params.target) {
        const newEdge: Edge = {
          id: `${params.source}-${params.target}`,
          source: params.source,
          target: params.target,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    []
  );

  return (
    <>
      <div className="h-screen w-full relative">
        <div className="absolute top-4 left-4 z-10 w-80 space-y-2">
          <Input
            type="password"
            placeholder="OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          
          {nodes.length === 0 ? (
            <Card className="p-4">
              <p className="text-sm font-medium mb-2">{t("mindFlow.createCenterTheme")}</p>
              <div className="flex flex-col space-y-2">
                <Input
                  placeholder={t("mindFlow.enterMainContent")}
                  value={newNodeContent}
                  onChange={(e) => setNewNodeContent(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && createRootNode()}
                />
                <Button onClick={createRootNode} className="w-full">
                  {t("mindFlow.create")}
                </Button>
              </div>
            </Card>
          ) : selectedNode && (
            <Card className="p-4">
              <p className="text-sm font-medium mb-2">选中���点: {selectedNode.data.content}</p>
              <div className="flex flex-col space-y-2">
                <Input
                  placeholder={t("mindFlow.addNodeContent")}
                  value={newNodeContent}
                  onChange={(e) => setNewNodeContent(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addManualNode()}
                />
                <Button 
                  size="sm"
                  onClick={addManualNode}
                  className="w-full"
                >
                  {t("mindFlow.addNode")}
                </Button>
                <div className="h-px bg-gray-200 my-2" />
                <Button 
                  size="sm"
                  onClick={() => expandNode(t("mindFlow.deepAnalysis"))}
                  disabled={isExpanding}
                  className="w-full"
                >
                  {t("mindFlow.deepAnalysis")}
                </Button>
                <Button
                  size="sm"
                  onClick={() => expandNode(t("mindFlow.lateralThinking"))}
                  disabled={isExpanding}
                  className="w-full"
                >
                  {t("mindFlow.lateralThinking")}
                </Button>
                <Button
                  size="sm"
                  onClick={() => expandNode(t("mindFlow.abstractSummary"))}
                  disabled={isExpanding}
                  className="w-full"
                >
                  {t("mindFlow.abstractSummary")}
                </Button>
              </div>
            </Card>
          )}
        </div>
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => setSelectedNode(node as MindFlowNode)}
          onPaneClick={() => setSelectedNode(null)}
          onConnect={onConnect}
          connectOnClick={true}
          fitView
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          }}
          connectionMode={ConnectionMode.Loose}
          snapToGrid={true}
          snapGrid={[15, 15]}
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={2}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑节点内容</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              placeholder="输入新的内容..."
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveEdit}>
                保存
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 
