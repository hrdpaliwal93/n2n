import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useNavigate, type NavigateFunction } from "react-router-dom"
import { type NodeTypes, type EdgeTypes , type nodeDefineSchema} from "../types/types"
import axios from 'axios'


interface AppContextType {
  nodes: NodeTypes[];
  setNodes: React.Dispatch<React.SetStateAction<NodeTypes[]>>;
  edges: EdgeTypes[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeTypes[]>>;
  navigate: NavigateFunction;
  saveWorkflowandexecute: () => Promise<void>;
  user: string,
  setUser: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  logout:()=>void,
  nodeList:nodeDefineSchema[] ,
  setNodeList: React.Dispatch<React.SetStateAction<nodeDefineSchema[]>>|[],

}

const AppContext = createContext<AppContextType | null>(null)



export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [nodes, setNodes] = useState<NodeTypes[]>([])
  const [edges, setEdges] = useState<EdgeTypes[]>([])
  const [user, setUser] = useState(()=>localStorage.getItem('user')|| "")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState(()=>localStorage.getItem('token')|| "")
  const [nodeList, setNodeList] = useState<nodeDefineSchema[]>([])


async function fetchNodes(){
const nodesList = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nodes`, {
  headers:{
    "Content-Type":"application/json",
    
  }
})
setNodeList(nodesList.data.nodesList)
}

useEffect(()=>{
 fetchNodes()
},[])


 function logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser("")
    setPassword("")
    setToken("")
    navigate('/')
  }

  async function saveWorkflowandexecute() {
    const workflow = {
      Nodes: nodes,
      Edges: edges,
    };
    const workflowid = localStorage.getItem('workflowid');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/execute-workflow`,
        {
          workflow,
          workflowid: workflowid || undefined,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if (response.data.success) {
        if (response.data.workflowid) {
          localStorage.setItem('workflowid', response.data.workflowid);
        }
        setNodes((prevnodes) =>
          prevnodes.map((n) => ({
            ...n,
            output: response.data.result ? response.data.result[n.id] : null
          }))
        );
        alert(response.data.message);
      }else {alert(response.data.result?.message);}
    } catch (e: any) {
      console.error(e.message);
    }
  }


  const value = { nodes, setNodes, logout, edges, setEdges, nodeList,setNodeList,  navigate, saveWorkflowandexecute, user, setUser, token, setToken ,password, setPassword}

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

