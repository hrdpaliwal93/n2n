import mongoose from 'mongoose';
mongoose.connect("mongodb+srv://hardikpaliwal2015:admin123@cluster0.jnppl4b.mongodb.net/n2n").then(() => console.log("db connected!")).catch((e) => console.error(e.message));
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const workflowSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    nodes: Array,
    edges: Array,
});
const nodeDefineSchema = new mongoose.Schema({
    category: { type: String, enum: ["trigger", "action", "condition"] },
    type: String,
    name: String,
    description: String,
});
const userModel = mongoose.model("User", userSchema);
const workflowModel = mongoose.model("Workflow", workflowSchema);
const nodeModel = mongoose.model("Node", nodeDefineSchema);
export { userModel, workflowModel, nodeModel };
//# sourceMappingURL=db.js.map