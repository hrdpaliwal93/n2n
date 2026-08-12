
import { createContext,useContext, useState, type  ReactNode } from "react"
import {useNavigate} from "react-router-dom"
import { type NodeTypes,type  EdgeTypes } from "@/pages/CreateWorkFlow"

interface AppProviderType{
  nodes:NodeTypes [],
  setNodes: React.Dispatch<React.SetStateAction<NodeTypes[]>>,
  edges:EdgeTypes[],
  setEdges:React.Dispatch<React.SetStateAction<EdgeTypes[]>>,
}

const AppContext  = createContext<AppProviderType | null> (null)  //takes a default value

export function AppProvider({children}:{children:ReactNode}){

    const navigate = useNavigate()
     const [nodes,setNodes] = useState<NodeTypes[]>([])
     const [edges, setEdges] = useState<EdgeTypes[]>([])
   
    
  
     const value = {nodes, setNodes, edges, setEdges,navigate}

        return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}

  

export function useAppContext(){
  const context = useContext(AppContext)
   if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");}
  else return context
}
 