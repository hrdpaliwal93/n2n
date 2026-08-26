import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/appcontext"

import axios from "axios"
import { useState } from "react"


export default function Login(){
  const {navigate,setUser} = useAppContext()

  const [loadig, setLoading] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [islogin, setIslogin] = useState(true)


async function login(e){
  e.preventDefault()
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {username, password}, {
      headers:{'Content-Type':"application/json"}})
      if(response.data.success){
        localStorage.setItem('token', response.data.token)
        setUser(response.data.userdetails.username)
        setTo
      }
}

async function handlesubmit(e){
  e.preventDefault()
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {username,password}, {
      headers:{'Content-Type':"application/json"}} )

    if(response.data.success){
      alert(response.data.message)
      login()
      




}

}

  return <div className="flex justify-center items-center ">
    <div className=" border-2 rounded-md w-[350px] p-4">
      <h1>{}</h1>
      <form onSubmit={handlesubmit} className=" flex flex-col gap-5">
        <input className="border-1 rounded-sm" type="text" placeholder="username"onChange={(e)=>setUsername(e.target.value)} />
        <input className="border-1 rounded-sm" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
         <Button type="submit" variant={"default"} size={"default"}>{islogin? "Login" : "Signup"}</Button>
        <p></p>
      </form>



    </div>

  </div>
}