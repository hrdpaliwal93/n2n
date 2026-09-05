export interface NodeTypes {

  category: "trigger" | "action" | "condition",
  type: string,
  id: string,
  position: { x: number, y: number },
  data: {
    label: string,
    metadata: Record<string, unknown>
  }


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

export interface formSubmit {



}

export interface aichatparams extends Record<string,unknown> {
  body?:  Record<string, unknown> ,
  input?:  Record<string, unknown>,
  output?: Record<string, unknown>,
  prompt?:  string ,

  modelprovider?:string,
  apikey?:  string 

}

export interface httprequestparams extends Record<string,unknown> {
  body?:  Record<string, unknown> ,
  input?:  Record<string, unknown>,
  response?: Record<string, unknown>,
  method: "GET"|"POST"|"DELETE"|"PUT"|"PATCH",
  url:  string ,
  headers: Record<string, unknown> ,
  
   
}

export interface emailparams extends Record<string,unknown> {
 to:string,
 from:string,
 subject:string,
 messagebody:string
  
   
}

