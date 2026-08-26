import { createContext, useContext,  useState, type ReactNode } from "react"
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
  user:string,
  setUser: React.Dispatch<React.SetStateAction<string>>
  token:string,
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [nodes, setNodes] = useState<NodeTypes[]>([])
  const [edges, setEdges] = useState<EdgeTypes[]>([])
  const [user, setUser] = useState("")
  const [token, setToken] = useState("")

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
            "content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.NmE4ZWEyZGNhMzQxNGFjZDI0ZmI0YzJk.jN85HRfiLQiiX8eQLw-rj15yUsNDvR2KvlkkuDXTUNc"
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




  const value = { nodes, setNodes, edges, setEdges, navigate, saveWorkflow , user, setUser, token, setToken}

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

