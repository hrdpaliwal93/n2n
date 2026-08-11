import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange,type EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface NodeTypes{
  type: "trigger" | "action" | "condition" ,
  input?:string | JSON,
  output?:string | JSON,
  id:string,
   position: { x: number, y: number },
   data: { label: string },

}
interface EdgeTypes{
  id: string,
   source: string,
    target: string 
  }

const initialNodes:NodeTypes[] = [
  {id:"n1", position:{x:0,y:100}, type:"trigger", data:{label:"Node 1"}},
  {id:"n2", position:{x:0,y:200}, type:"trigger", data:{label:"Node 2"}},
]
const initialEdges:EdgeTypes[] = [
  {id:"n1-n2",source:"n1", target:"n2" }
]
 
export default function CreateWorkFlow() {
  const [nodes, setNodes] = useState<NodeTypes[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeTypes[]>(initialEdges);
 
  const onNodesChange = useCallback((changes:NodeChange<NodeTypes>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  const onEdgesChange = useCallback((changes:EdgeChange<EdgeTypes>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  const onConnect = useCallback((params:any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}