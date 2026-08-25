import express from 'express'
import cors from 'cors'
import {userModel, workflowModel} from '../packages/db/db.js'
const app = express()
app.use(cors())
app.use(express.json())

//sign up
//login 

//create workflow

//see all workfloew on dahsboard 
//get workfloe with id .

//execute  a worrkflow 



app.post('/signup', async (req,res)=>{
    const {username, password} = req.body;
    try{
        await userModel.create({username, password})
        res.json({message:"signup successful", success:true})
    }catch(e:any){
        res.json({message:e.message, success:false})
    }

})

app.post('/save-workflow',async (req,res)=>{
    const workflow =(req.body);
    
   
   try{
    await workflowModel.create({
        nodes:workflow.Nodes,
        edges:workflow.Edges
    })
    res.json({message:"workflow saved ", success:true})
   }catch(e:any){
    console.error(e.message)
   }

   
})




app.listen(8000)