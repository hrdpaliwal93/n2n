import { Route, Routes} from "react-router-dom"
import CreateWorkFlow from "./pages/CreateWorkFlow"
import Home from "./pages/Home"

export default function App(){


  return <div className="bg-red-500ss">
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-workflow" element={<CreateWorkFlow />} />
    </Routes>
    
    
    
</div>
}