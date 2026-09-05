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
  saveWorkflow: () => Promise<void>;
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



const DEFAULT_NODES: nodeDefineSchema[] = [
  { category: "trigger", type: "formsubmit", name: "Form Submit", description: "Triggers on HTML form submission" },
  { category: "trigger", type: "manual", name: "Manual Trigger", description: "Trigger workflow manually" },
  { category: "trigger", type: "schedule", name: "Schedule", description: "Trigger on a recurring schedule" },
  { category: "action", type: "httprequest", name: "HTTP Request", description: "Send an HTTP request" },
  { category: "action", type: "aichat", name: "AI Chat", description: "Generate AI response" },
  { category: "action", type: "email", name: "Send Email", description: "Send an email with To, From, Subject, and Body" },
  { category: "condition", type: "ifelse", name: "If / Else", description: "Conditional branch logic" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [nodes, setNodes] = useState<NodeTypes[]>([])
  const [edges, setEdges] = useState<EdgeTypes[]>([])
  const [user, setUser] = useState(()=>localStorage.getItem('user')|| "")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState(()=>localStorage.getItem('token')|| "")
  const [nodeList, setNodeList] = useState<nodeDefineSchema[]>(DEFAULT_NODES)


async function fetchNodes(){
  try {
    const nodesList = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nodes`, {
      headers:{
        "Content-Type":"application/json",
      }
    })
    if (nodesList.data?.nodesList?.length > 0) {
      const fetched: nodeDefineSchema[] = nodesList.data.nodesList;
      const hasEmail = fetched.some((n) => n.type === "email");
      if (!hasEmail) {
        fetched.push({ category: "action", type: "email", name: "Send Email", description: "Send an email with To, From, Subject, and Body" });
      }
      setNodeList(fetched);
    }
  } catch {
    // fallback to DEFAULT_NODES
  }
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

  async function saveWorkflow() {
    const workflow = {
      Nodes: nodes,
      Edges: edges,
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/save-workflow`,
        workflow,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        }
      )

      if (response.data.success) {
        alert(response.data.message)
      }
    } catch (e: any) {
      console.error(e.message)
    }
  }


  const value = { nodes, setNodes, logout, edges, setEdges, nodeList,setNodeList,  navigate, saveWorkflow, user, setUser, token, setToken ,password, setPassword}

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

