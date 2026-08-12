
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange } from '@xyflow/react';
import { useAppContext } from '@/context/appcontext';
import '@xyflow/react/dist/style.css';
import Triggersheet from '@/components/Triggersheet';
import { useCallback } from 'react';

export interface NodeTypes {
  
  type: "trigger" | "action" | "condition",
  input?: string | Record<string, unknown>,
  output?: string | Record<string, unknown>,
  id: string,
  position: { x: number, y: number },
  data: { label: string },

}
export interface EdgeTypes {
  id: string,
  source: string,
  target: string
}

export default function CreateWorkFlow() {
  const { nodes, setNodes, edges, setEdges } = useAppContext()


  const onNodesChange = useCallback((changes: NodeChange<NodeTypes>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  const onEdgesChange = useCallback((changes: EdgeChange<EdgeTypes>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  const onConnect = useCallback((params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

  return <>

    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && <Triggersheet />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  </>

}