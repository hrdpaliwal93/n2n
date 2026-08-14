export interface NodeDefinition {
  type: "trigger" | "action" | "condition";
  kind: string;
  name: string;
  description: string;
}

export const Triggers: NodeDefinition[] = [
    { type: "trigger", kind: "manual", name: "Manual Trigger", description: "Runs workflow on button click" },
    { type: "trigger", kind: "schedule", name: "Schedule Trigger", description: "Runs workflow at scheduled intervals" },
    { type: "trigger", kind: "onformsubmit", name: "Form Submit Trigger", description: "Runs when a form is submitted" },
];

export const Conditions: NodeDefinition[] = [
    { type: "condition", kind: "ifelse", name: "If / Else", description: "Branch workflow based on condition" },
    { type: "condition", kind: "switch", name: "Switch", description: "Branch into multiple paths" },
];

export const Actions: NodeDefinition[] = [
    { type: "action", kind: "httprequest", name: "HTTP Request", description: "Send a GET/POST web request" },
    { type: "action", kind: "sendemail", name: "Send Email", description: "Send an email via SMTP" },
];

  