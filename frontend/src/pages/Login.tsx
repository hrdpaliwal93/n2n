import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/appcontext"

import axios from "axios"
import { useRef, useState } from "react"



export default function Login() {
  const { navigate, setUser, setToken } = useAppContext()
  const usernameref = useRef(null)
  const passwordref = useRef(null)
  const [loadig, setLoading] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [islogin, setIslogin] = useState(true)

  function toggle() {
    setIslogin(!islogin)
    setPassword("")
    setUsername("")
    usernameref.current.value = ""
    passwordref.current.value = ""


  }
  async function login() {
    setLoading(true)

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { username, password }, {
      headers: { 'Content-Type': "application/json" }
    })
    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', response.data.userdetails.username)
      setUser(response.data.userdetails.username)

      setToken(response.data.token)
      navigate('/')
    }else alert(response.data.message)

    setLoading(false)
  }
  async function signup() {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, { username, password }, {
      headers: { 'Content-Type': "application/json" }
    })
    if (response.data.success) {
      alert("sigup successful, now login once to continue !!")


    }
  }
  async function handlesubmit(e: React.FormEvent) {
    e.preventDefault()
    islogin ? login() : signup()

  }
 
  return <div className="flex justify-center items-center ">
    <div className=" border-2 rounded-md w-[350px] p-4">
      <h1>{islogin ? "welcome Back!" : "create a new account"}</h1>
      <form onSubmit={handlesubmit} className=" flex flex-col gap-5">
        <input ref={usernameref} className="p-2 border-1 rounded-sm" type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <input ref={passwordref} className="p-2 border-1 rounded-sm" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant={"default"} size={"default"} disabled={loadig}>

        {loadig ? ( <span className="flex items-center gap-2">
      <span className="animate-spin">⏳</span> {islogin ? "Logging in..." : "Signing up..."}
    </span>) :   (islogin ? "Login" : "Signup")}
           </Button>
        <p>{islogin ? "New here?" : "already a user?"}<button type="button" onClick={toggle} className="cursor-pointer">{islogin ? "signup" : "login"}</button></p>

        <p></p>
      </form>



    </div>

  </div>
}