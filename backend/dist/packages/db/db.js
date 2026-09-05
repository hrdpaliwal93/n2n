import mongoose, { Schema, Document } from 'mongoose';
mongoose.connect("mongodb+srv://hardikpaliwal2015:admin123@cluster0.jnppl4b.mongodb.net/n2n").then(() => console.log("db connected!")).catch((e) => console.error(e.message));
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const workflowSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    nodes: [],
    edges: [],
});
const nodeDefineSchema = new mongoose.Schema({
    category: { type: String, enum: ["trigger", "action", "condition"] },
    type: String,
    name: String,
    description: String,
});
const triggerNodeSchema = new mongoose.Schema({
    id: { type: String },
    position: { x: { type: Number }, y: { type: Number } },
    status: { type: String, enum: ["pending", "completed", "failed"] },
    data: {
        label: { type: String },
        body: { type: Schema.Types.Mixed },
        content: { type: Schema.Types.Mixed },
        scheduleTime: { type: String }
    }
});
const actionNodeSchema = new mongoose.Schema({
    id: { type: String, required: true, },
    position: { x: { type: Number, required: true, }, y: { type: Number, required: true, }, },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending", },
    data: {
        label: { type: String, },
        body: { type: mongoose.Schema.Types.Mixed, },
        content: { type: mongoose.Schema.Types.Mixed, },
        input: { type: mongoose.Schema.Types.Mixed, },
        output: { type: mongoose.Schema.Types.Mixed, },
        prompt: { type: String, },
        method: { type: String, enum: ["GET", "POST", "DELETE", "PUT", "PATCH"], },
        url: { type: String, },
        headers: { type: mongoose.Schema.Types.Mixed, },
        modelprovider: { type: String, },
        apikey: { type: String, },
    }
});
const userModel = mongoose.model("User", userSchema);
const TriggerNodeModel = mongoose.model("TriggerNode", triggerNodeSchema);
const ActionNodeModel = mongoose.model("ActionNode", actionNodeSchema);
const workflowModel = mongoose.model("Workflow", workflowSchema);
const nodeModel = mongoose.model("Node", nodeDefineSchema);
export { userModel, workflowModel, nodeModel, TriggerNodeModel };
//# sourceMappingURL=db.js.map