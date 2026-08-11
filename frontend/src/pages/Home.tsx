import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function Home(){

    const  navigate = useNavigate()
function handler(){
  navigate('/create-workflow')
}



    return <div className="flex justify-center">
        <h1>welcome to n2n ! </h1>
     <div className="mt-10">
    <Button className="cursor-pointer" 
    variant={"default"} size={"default"} onClick={handler}>create workflow</Button>
     </div>
    </div>
}