interface NodeDefinition{
    type:"trigger"|"action"|"condition",
    name:string,
    description:string
}


const Triggers: NodeDefinition[] = [
    {type:"trigger",name:"Manual Trigger",description:"Runs workflow on button click"},
    {type:"trigger",name:"Schedule Trigger",description:"Runs workflow at scheduled intervals"},
    {type:"trigger",name:"Form Submit Trigger",description:"Runs when a form is submitted"},
]

const Actions: NodeDefinition[] = [
    {type:"action",name:"HTTP Request",description:"Send a GET/POST web request"},
    {type:"action",name:"Send Email",description:"Send an email via SMTP"},
]
const Conditions: NodeDefinition[] = [
    {type:"condition",name:"If / Else",description:"Branch workflow based on condition"},
    {type:"condition",name:"Switch",description:"Branch into multiple paths"},
]

export  {Triggers,Actions,Conditions}