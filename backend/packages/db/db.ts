import mongoose from 'mongoose'
mongoose.connect(`${process.env.DATABASE_URL}/n2n`).then(()=>console.log("db connrctd!")).catch((e)=>console.error(e.message))


const userSchema = new mongoose.Schema({
    username:String,
    password:String


})

const workflowSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    nodes:Array,
    edges:Array,
    
})

export const User = mongoose.model("User", userSchema)
export const Workflow = mongoose.model("Workflow", workflowSchema)