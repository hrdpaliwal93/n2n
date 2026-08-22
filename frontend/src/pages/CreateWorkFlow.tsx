
import { ReactFlow, applyNodeChanges, applyEdgeChanges, type Edge, addEdge, type NodeChange, type EdgeChange, Controls, MiniMap, Background } from '@xyflow/react';
import { useAppContext } from '@/context/appcontext';
import '@xyflow/react/dist/style.css';
import Triggersheet from '@/components/Triggersheet';
import { useCallback , useState } from 'react';
import  Formsubmit  from '@/nodes/Triggers/Formsubmit';
import { Manual } from '@/nodes/Triggers/Manual';
import { Schedule } from '@/nodes/Triggers/Schedule';
import AIChatResponse from '@/nodes/Actions/AIChatResponse';
import Parameters from '@/components/Parameters';
import HttpRequest from '@/nodes/Actions/HttpRequest';
import ifElse from '@/nodes/conditions/ifElse';



export interface NodeTypes {

  category: "trigger" | "action" | "condition",
  type:string,
  input?: string | Record<string, unknown>,
  output?: string | Record<string, unknown>,
  id: string,
  position: { x: number, y: number },
  data: {
     label: string,
    body?:Record<string,unknown>,
    headers?:Record<string,unknown>,
    method?:string,
    url?:string,
    model?:string,
    api?:string
  },

}
export interface EdgeTypes {
  id: string,
  source: string,
  target: string
}

const nodetypes = {
  formsubmit:Formsubmit,
  manual:Manual,
  schedule:Schedule,
  httprequest:HttpRequest,
  aichat:AIChatResponse,
  ifelse:ifElse
}
export default function CreateWorkFlow() {
  const { nodes, setNodes, edges, setEdges } = useAppContext()
  const [selectedNode, setSelectedNode] = useState<NodeTypes | null>(null);


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
        onNodeClick={(event, node) => {setSelectedNode(node)}}
         deleteKeyCode={['Backspace', 'Delete']}
       
      
        //delete an edge on clicking it and then presing delete key 


        fitView
        colorMode="system"
        
      >
        <Background />
        <Controls />
        <MiniMap />

      </ReactFlow>

      {selectedNode && (
      <Parameters node={selectedNode} onClose={() => setSelectedNode(null)} />
)}



    </div>
  </>

}