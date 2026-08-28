import express from 'express';
import cors from 'cors';
import { userModel, workflowModel } from '../packages/db/db.js';
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
    const wait = await new Promise((resolve) => setTimeout(resolve, 10000));
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
app.listen(8000);
//# sourceMappingURL=index.js.map