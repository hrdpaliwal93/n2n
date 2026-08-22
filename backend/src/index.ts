import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())

//sign up
//login 

//create workflow

//see all workfloew on dahsboard 
//get workfloe with id .

//execute  a worrkflow 



app.post('/api/v1/save-workflow', (req,res)=>{
    const workflow =(req.body);
   
   console.dir(workflow, { depth: null });

    res.json({message:"workflow received", success:true})
})
app.listen(8000)