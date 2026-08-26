import { Route, Routes } from "react-router-dom"
import CreateWorkFlow from "./pages/CreateWorkFlow"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-workflow" element={<CreateWorkFlow />} />
      </Routes>
    </div>
  )
}