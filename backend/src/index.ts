import express from 'express'
import cors from 'cors'
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


app.post('/save-workflow', Auth, async (req, res) => {
    const workflow = (req.body);
    const id = req.id as string
    try {
        await workflowModel.create({
            title: "my firtt workflow",
            userID: id,
            nodes: workflow.Nodes,
            edges: workflow.Edges
        })
        res.json({ message: "workflow saved ", success: true })
    } catch (e: any) {
        console.error(e.message)
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


app.post('/execute-workflow', async (req, res) => {
    const workflowid = req.body.workflowid;

    try {
        const workflow = await workflowModel.findOne({ workflowid })
        //find a trigger node, if not return message

        if (!workflow) {
            res.json({ message: "worflow does not exixts", success: false })
            return
        }
        const result = await executeworkflow(workflow);
        res.json({ message: "workflow output", success: true, result });


    } catch (e: any) {
        res.status(500).json({ message: e.message, success: false });
    }
})

function gettriggernode(workflow: any) {
    return workflow.nodes.find((node: any) => node.category == "trigger")
}

async function executeworkflow(workflow: any) {
    const triggernode = gettriggernode(workflow)
    if (!triggernode) return { messsage: "workflow should have a trigger node", success: false }

    let queue: string[] = [triggernode.id]

    let runData: Record<string, unknown> = {}
    while (queue.length > 0) {
        let currentnode: string = queue.shift() as string
        let node = await nodeModel.findOne({ id: currentnode })
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

            default:

        }


        let nextedge = workflow.edges.find((edge: any) => edge.source == currentnode)
        if (nextedge) queue.push(nextedge.target)
    }

    return runData;
}

async function aichatexecute(node: any, input: any) {
    const { modelprovider, prompt, apikey } = node.data
    let finalPrompt = prompt
    if (input) {
        const inputString = typeof input === 'object' ? JSON.stringify(input) : input;
        finalPrompt = `${finalPrompt}\n\nInput Data:\n${inputString}`;
    }
    const ai = new GoogleGenAI({ apiKey: apikey });

    const interaction = await ai.interactions.create({
        model: `${modelprovider}`,
        input: `${finalPrompt}`,
    });

    return (interaction.output_text);
}


async function httprequestexecute(node: any) {
    const { headers, body, method, url } = node.Data
    if (method.toLowerCase() == "get") {
        const response = await axios.get(url, headers);
        return response;
    }

}
app.listen(8000)