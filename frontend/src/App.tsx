import { Route, Routes} from "react-router-dom"
import CreateWorkFlow from "./pages/CreateWorkFlow"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"

export default function App(){


  return <div className="bg-red-500ss">
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-workflow" element={<CreateWorkFlow />} />
    </Routes>
    
    
    
</div>
}