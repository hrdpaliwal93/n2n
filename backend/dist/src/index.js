import express from 'express';
import cors from 'cors';
import { nodeModel, userModel, workflowModel } from '../packages/db/db.js';
import jwt from 'jsonwebtoken';
import Auth from '../auth/auth.js';
const app = express();
app.use(cors());
app.use(express.json());
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
        await userModel.create({ username, password });
        res.json({ message: "signup successful", success: true });
    }
    catch (e) {
        res.json({ message: e.message, success: false });
    }
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username, password });
        if (user) {
            const token = jwt.sign(user._id.toString(), "thismyjsownwentokensecret");
            const userdetails = { username, id: user._id };
            res.json({ message: "login successful", token: token, success: true, userdetails });
        }
        else {
            res.json({ message: "user not found", success: false });
        }
    }
    catch (e) {
        res.json({ message: e.message, success: false });
    }
});
app.post('/save-workflow', Auth, async (req, res) => {
    const workflow = (req.body);
    const id = req.id;
    try {
        await workflowModel.create({
            title: "my firtt workflow",
            userID: id,
            nodes: workflow.Nodes,
            edges: workflow.Edges
        });
        res.json({ message: "workflow saved ", success: true });
    }
    catch (e) {
        console.error(e.message);
    }
});
app.get('/workflows', Auth, async (req, res) => {
    const id = req.id;
    try {
        const workflows = await workflowModel.find({ userID: id });
        res.json({ message: "my all workflows", success: true, workflows });
    }
    catch (e) {
        console.error(e.message);
    }
});
app.get('/nodes', async (req, res) => {
    try {
        const nodesList = await nodeModel.find();
        res.json({ message: "all nodes", success: true, nodesList });
    }
    catch (e) {
        console.error(e.message);
    }
});
app.post('/execute-workflow', async (req, res) => {
    const workflowid = req.body.workflowid;
    try {
        const workflow = await workflowModel.findOne({ workflowid });
        //find a trigger node, if not return message
        if (!workflow) {
            res.json({ message: "worflow does not exixts", success: false });
            return;
        }
        const triggernode = workflow.nodes.filter((node) => node.category == "trigger");
        if (!triggernode) {
            res.json({ message: "workflow should habe a trigger node", success: false });
            return;
        }
        //execute this , find next node, execute that
        const currentnode = triggernode;
        const nextnode = workflow.edges;
    }
    catch (e) {
        console.error(e);
    }
});
function gettriggernode(workflow) {
    return workflow.nodes.find((node) => node.category == "trigger");
}
async function executeworkflow(workflow) {
    const triggernode = gettriggernode(workflow);
    if (!triggernode)
        return { messsage: "workflow should have a trigger node", success: false };
    let queue = [triggernode.id];
    let runData = {};
    while (queue.length > 0) {
        let currentnode = queue.shift();
        let node = await nodeModel.findOne({ id: currentnode });
        switch (node?.type) {
            case 'aichat':
                const data = aichatexecute(node, node.input);
                runData[currentnode] = data;
            case 'httprequest':
                { }
            case 'sendemail':
                { }
            default:
        }
        let nextedge = workflow.edges.find((edge) => edge.source == currentnode);
        queue.push(nextedge.target);
    }
}
app.listen(8000);
//# sourceMappingURL=index.js.map