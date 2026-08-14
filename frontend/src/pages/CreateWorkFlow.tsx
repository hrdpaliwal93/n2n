
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange, Controls, MiniMap, Background } from '@xyflow/react';
import { useAppContext } from '@/context/appcontext';
import '@xyflow/react/dist/style.css';
import Triggersheet from '@/components/Triggersheet';
import { useCallback } from 'react';
import { Fromsubmit } from '@/nodes/Triggers/Formsubmit';
import { Manual } from '@/nodes/Triggers/Manual';
import { Schedule } from '@/nodes/Triggers/Schedule';
export interface NodeTypes {

  category: "trigger" | "action" | "condition",
  type:string,
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

const nodetypes = {
  formsubmit:Fromsubmit,
  manual:Manual,
  schedule:Schedule
}
export default function CreateWorkFlow() {
  const { nodes, setNodes, edges, setEdges } = useAppContext()


  const onNodesChange = useCallback((changes: NodeChange<NodeTypes>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  const onEdgesChange = useCallback((changes: EdgeChange<EdgeTypes>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  const onConnect = useCallback((params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

  return <>

    <div style={{ width: '100vw', height: '100vh' }}>
      <Triggersheet />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodetypes}
        fitView
        colorMode="system"
        
      >
        <Background />
        <Controls />
        <MiniMap />

      </ReactFlow>
    </div>
  </>

}