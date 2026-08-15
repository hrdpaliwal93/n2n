interface NodeDefinition{
    category:"trigger"|"action"|"condition",
    type:string,
    name:string,
    description:string
}


const Triggers: NodeDefinition[] = [
    {category:"trigger",name:"Manual category",type:"manual",description:"Runs workflow on button click"},
    {category:"trigger",name:"Schedule Trigger",type:"schedule",description:"Runs workflow at scheduled intervals"},
    {category:"trigger",name:"Form Submit Trigger",type:"formsubmit",description:"Runs when a form is submitted"},
]

const Actions: NodeDefinition[] = [
    {category:"action",name:"HTTP Request",type:"httprequest",description:"Send a GET/POST web request"},
    {category:"action",name:"Send Email",type:"sendemail",description:"Send an email via SMTP"},
    {category:"action",name:"AI Chat ",type:"aichat",description:"send a prompt to ai chat model and get the response"},
]
const Conditions: NodeDefinition[] = [
    {category:"condition",name:"If / Else",type:"ifelse",description:"Branch workflow based on condition"},
    {category:"condition",name:"Switch",type:"switch",description:"Branch into multiple paths"},
]

export  {Triggers,Actions,Conditions}