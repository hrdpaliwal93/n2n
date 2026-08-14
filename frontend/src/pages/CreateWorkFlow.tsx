
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange, Controls, MiniMap, Background } from '@xyflow/react';
import { useAppContext } from '@/context/appcontext';
import '@xyflow/react/dist/style.css';
import Triggersheet from '@/components/Triggersheet';
import { useCallback } from 'react';
import Onformsubmit from '@/nodes/Triggers/Onformsubmit';
import Manual from '@/nodes/Triggers/Manual';
import Schedule from '@/nodes/Triggers/Schedule';

export interface NodeTypes {
  id: string;
  type: string;
  kind?: string;
  position: { x: number; y: number };
  data: { label: string };
  input?: string | Record<string, unknown>;
  output?: string | Record<string, unknown>;
  parameters?: string | Record<string, unknown>;
}

export interface EdgeTypes {
  id: string;
  source: string;
  target: string;
}

const nodeTypes = {
  manual: Manual,
  schedule: Schedule,
  onformsubmit: Onformsubmit,
};

export default function CreateWorkFlow() {
  const { nodes, setNodes, edges, setEdges } = useAppContext();

  const onNodesChange = useCallback(
    (changes: NodeChange<any>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<any>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Triggersheet />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        fitView
        colorMode="system"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}