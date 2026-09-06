import express from 'express'
import cors from 'cors'
import { tavily }  from "@tavily/core";
import 'dotenv/config'
import { GoogleGenAI } from "@google/genai";
import { nodeModel, userModel, workflowModel } from '../packages/db/db.js'
import jwt from 'jsonwebtoken'
import Auth from '../auth/auth.js'
import axios from 'axios'
const app = express()
app.use(cors())
app.use(express.json())

//sign up
//login 

//create workflow

//see all workfloew on dahsboard 
//get workfloe with id .

//execute  a worrkflow 


//need zod validation and password bcrypt and correct matching 


app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        await userModel.create({ username, password })
        res.json({ message: "signup successful", success: true })
    } catch (e: any) {
        res.json({ message: e.message, success: false })
    }

})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username, password })
        if (user) {
            const token = jwt.sign(user._id.toString(), "thismyjsownwentokensecret")
            const userdetails = { username, id: user._id }
            res.json({ message: "login successful", token: token, success: true, userdetails })
        } else {
            res.json({ message: "user not found", success: false })
        }
    } catch (e: any) {
        res.json({ message: e.message, success: false })
    }
})





app.get('/workflows', Auth, async (req, res) => {
    const id = req.id as string
    try {
        const workflows = await workflowModel.find({ userID: id })
        res.json({ message: "my all workflows", success: true, workflows })

    } catch (e: any) {
        console.error(e.message)
    }
})

app.get('/nodes', async (req, res) => {

    try {
        const nodesList = await nodeModel.find()
        res.json({ message: "all nodes", success: true, nodesList })

    } catch (e: any) {
        console.error(e.message)
    }
})


app.post('/execute-workflow', Auth, async (req, res) => {
    const { workflow, workflowid } = req.body;
    console.log(workflow)
    const id = req.id as string;
    try {
        let w;
        if (!workflowid || workflowid==='undefined' || workflowid==='null') {
            w = await workflowModel.create({
                title: "my first workflow",
                userID: id,
                nodes: workflow?.Nodes,
                edges: workflow?.Edges
            });
        } else {
            w = await workflowModel.findByIdAndUpdate(
                workflowid,
                { nodes: workflow?.Nodes || [], edges: workflow?.Edges || [] },
                { new: true }
            );
            if(!w){
                w = await workflowModel.create({
                title: "my first workflow",
                userID: id,
                nodes: workflow?.Nodes,
                edges: workflow?.Edges
            });
            }
        }
        const result = await executeworkflow(w);
         res.json({ 
        message: "workflow saved and executed", 
        success: true, 
        result, 
        workflowid: w?._id 
    });
    } catch (e: any) {
        console.error(e.message);
        res.status(500).json({ message: e.message, success: false });
    }
});

function gettriggernode(workflow: any) {
    return workflow.nodes.find((node: any) => node.category == "trigger")
}

async function executeworkflow(workflow: any) {
    const triggernode = await gettriggernode(workflow)
    if (!triggernode) return  { message: "workflow should have a trigger node", success: false }

    let queue: string[] = [triggernode.id]

    let runData: Record<string, unknown> = {}
    while (queue.length > 0) {
        let currentnode: string = queue.shift() as string
       let node = workflow.nodes.find((n: any) => n.id === currentnode);
       console.log("found node: ")
        let parentedge = workflow.edges.find((edge: any) => edge.target == currentnode)
        let input = parentedge ? runData[parentedge.source] : null;
        switch (node?.type) {
            case 'aichat':
                runData[currentnode] = await aichatexecute(node, input)
                break;
            case 'httprequest':
                runData[currentnode] = await httprequestexecute(node)
                break;
            case 'sendemail':
                { }
                break;
            case 'websearch':
                runData[currentnode] = await websearchexecute(node)
                break;

            default:

        }


        let nextedge = workflow.edges.find((edge: any) => edge.source == currentnode)
        if (nextedge) queue.push(nextedge.target)
    }

    return runData;
}

async function aichatexecute(node: any, input: any) {
    const { modelprovider, prompt, apikey } = node.data.metadata
    let finalPrompt = prompt
    console.log(finalPrompt)
    if (input) {
        const inputString = typeof input === 'object' ? JSON.stringify(input) : input;
        finalPrompt = `${finalPrompt}\n\nInput Data:\n${inputString}`;
    }
    const ai = new GoogleGenAI({ apiKey: `${apikey}` });

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: `${finalPrompt}`,
    });

    return (interaction.output_text);
}


async function httprequestexecute(node: any) {
   const metadata = node.data?.metadata 
    const { headers, body, method, url } = metadata;
    if (!url) {
        return { error: "URL is missing for HTTP Request node" };
    }
    const httpMethod = (method || "GET").toUpperCase();
    const config = {
        headers: {
            'content-type':"application/json"
        }
    };
    try {
        let response;
        if (httpMethod === "GET") {
            response = await axios.get(url, config);
        } else if (httpMethod === "POST") {
            response = await axios.post(url, body || {}, config);
        } else if (httpMethod === "PUT") {
            response = await axios.put(url, body || {}, config);
        } else if (httpMethod === "DELETE") {
            response = await axios.delete(url, config);
        } else if (httpMethod === "PATCH") {
            response = await axios.patch(url, body || {}, config);
        }
        return response?.data
    } catch (err: any) {
        console.error("HTTP Request Error:", err.message);
        return { error: err.response?.data || err.message };
    }
}



async function websearchexecute(node:any){
    const { query } = node?.data?.metadata || {};
   


    const tvly = tavily({ apiKey: `${process.env.websearch_url}` });
    const response = await tvly.search(
        query,{searchDepth: "advanced",maxResults:5}
       
    );

    return response;

}
app.listen(8000)