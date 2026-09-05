import { Outlet, Route, Routes} from "react-router-dom"
import CreateWorkFlow from "./pages/CreateWorkFlow"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"

  function Mainlayout(){
    return <>
    <Navbar />
    <Outlet />
    </>
  }


export default function App() {

  return (
    <div>
          
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Mainlayout />}>
          <Route path="/" element={ <Home />} />
        
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-workflow" element={<CreateWorkFlow />} />
        </Route>
      </Routes>
    </div>
  )
}