import mongoose, {Schema, Document} from 'mongoose'
mongoose.connect("mongodb+srv://hardikpaliwal2015:admin123@cluster0.jnppl4b.mongodb.net/n2n").then(()=>console.log("db connected!")).catch((e)=>console.error(e.message))


const userSchema = new mongoose.Schema({
    username:String,
    password:String


})

const workflowSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    title:String,
    nodes:[],
    edges:[],
    
})


const nodeDefineSchema = new mongoose.Schema({
    category: { type: String, enum: ["trigger", "action", "condition"] },
    type: String,
    name: String,
    description: String,
})

export interface TriggerNode extends Document{
  id: string,
  position: { x: number, y: number },
  status?:"pending"|"completed"|"failed",
  data: {
    label: string,
    body?:Record<string,unknown>,
    content?:string | Record<string, unknown>,
    scheduleTime?:String
  },

}

const triggerNodeSchema = new mongoose.Schema<TriggerNode>({
    id: {type:String},
      position: {
    x: { type: Number },
    y: { type: Number },
  },
      status:{type:String, enum:["pending","completed","failed"]},
      data: {
         label: {type:String},
        body:{type: Schema.Types.Mixed},
       
        content:{type:Schema.Types.Mixed},
        scheduleTime:{type:String}
      }
    
})
const userModel = mongoose.model("User", userSchema)
const TriggerNodeModel = mongoose.model<TriggerNode>("TriggerNode", triggerNodeSchema)
const workflowModel = mongoose.model("Workflow", workflowSchema)
const nodeModel= mongoose.model("Node", nodeDefineSchema)


export {userModel, workflowModel, nodeModel, TriggerNodeModel}
