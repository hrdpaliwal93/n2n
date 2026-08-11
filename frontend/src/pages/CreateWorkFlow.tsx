import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange,type EdgeChange } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import Triggersheet from '@/components/ui/Triggersheet';

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
  // const initialNodes :NodeTypes[] = [
  //   {id:"1", 
  //     type:"trigger",
  //      position:{x:0,y:100},
  //     data:{label:"node1"
  //     }}
  // ]



const TriggerNodes:NodeTypes[] = [
  {}
]
export default function CreateWorkFlow() {

  const [nodes, setNodes] = useState<NodeTypes[]>([]);
  const [edges, setEdges] = useState<EdgeTypes[]>([]);
 
  const onNodesChange = useCallback((changes:NodeChange<NodeTypes>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  const onEdgesChange = useCallback((changes:EdgeChange<EdgeTypes>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  const onConnect = useCallback((params:any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);
 
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