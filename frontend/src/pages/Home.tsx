import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "@/context/appcontext"



export default function Home() {
  const navigate = useNavigate()
  const { user } = useAppContext()

  return <>
 

    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      

      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Welcome to n2n!</h1>
      <div className="flex gap-4">
        {user &&(
          <>
         
            <Button 
              className="cursor-pointer" 
              onClick={() => navigate('/create-workflow')}
            >
              Create Workflow
            </Button>
            <Button 
              variant="outline" 
              className="cursor-pointer" 
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          </>
        ) }
      </div>
    </div>
  </>
}