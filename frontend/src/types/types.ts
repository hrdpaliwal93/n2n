export interface NodeTypes {

  category: "trigger" | "action" | "condition",
  type:string,
  input?: string | Record<string, unknown>,
  output?: string | Record<string, unknown>,
  id: string,
  position: { x: number, y: number },
  status?:"pending"|"completed"|"failed",
  data: {
     label: string,
    body?:Record<string,unknown>,
    headers?:Record<string,unknown>,
    method?:string,
    url?:string,
    model?:string,
    api?:string,
    content?:string
  },

}
export interface EdgeTypes {
  id: string,
  source: string,
  target: string
}

export interface nodeDefineSchema {
  category: "trigger" | "action" | "condition";
  type: string;
  name: string;
  description: string;
}

