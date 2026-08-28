import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useNavigate, type NavigateFunction } from "react-router-dom"
import { type NodeTypes, type EdgeTypes } from "@/pages/CreateWorkFlow"
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
  logout:()=>void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [nodes, setNodes] = useState<NodeTypes[]>([])
  const [edges, setEdges] = useState<EdgeTypes[]>([])
  const [user, setUser] = useState(()=>localStorage.getItem('user')|| "")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState(()=>localStorage.getItem('token')|| "")




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




  const value = { nodes, setNodes, logout, edges, setEdges, navigate, saveWorkflow, user, setUser, token, setToken ,password, setPassword}

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

