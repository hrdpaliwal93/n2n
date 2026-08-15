import { type NodeTypes } from "@/pages/CreateWorkFlow"
import { Button } from "./ui/button"
export default function HoverDeletion({node}: {node:NodeTypes}){

    function deletenode(node){

    }
    return <div>
       <Button>Delete</Button>
    </div>
}
    

// (event, selectedNode)=>{
//           const {id} = selectedNode
//           setNodes((nds) => nds.filter((node) => node.id !== id))
//           setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id))
//         }  &&(HoverDeletion)