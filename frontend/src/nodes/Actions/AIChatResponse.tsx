import { Handle, Position } from "@xyflow/react";
import { useEffect, useState } from "react";

import { useAppContext } from "@/context/appcontext";
import type { NodeTypes } from "@/types/types";
import { Button } from "@/components/ui/button";
import type { aichatparams } from "@/types/types";

export default function AIChatResponse() {
  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-purple-500 rounded-xl p-3.5 shadow-md min-w-[220px] text-slate-900 dark:text-slate-100">
      {/* Node Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-4 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
          🤖
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase block leading-none">
            Action
          </span>
          <h4 className="text-sm font-semibold leading-tight mt-0.5">AI Chat</h4>
        </div>
      </div>

      {/* Input Connection Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-slate-900"
      />

      {/* Output Connection Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-slate-900"
      />
    </div>
  );
}



export function AIChatParams({ node }: { node?: NodeTypes }) {

  const { setNodes } = useAppContext();
  const [modelprovider, setModelProvider] = useState("");
  const [apikey, setApikey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setresponse] = useState("");

  const aichatparams:aichatparams = {
        prompt:prompt,
        modelprovider: modelprovider as  "GET"|"POST"|"DELETE"|"PUT"|"PATCH",
        apikey:apikey,
        response

  }

  useEffect(() => {
    const meta = (node?.data?.metadata as aichatparams);
    setPrompt(meta.prompt || "");
    setApikey(meta.apikey || "");
    setModelProvider(meta.modelprovider || "gemini");
  }, [node?.id, node?.data?.metadata]);

 function handleSaveNodeData() {
    if (!node) return;
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
               metadata:aichatparams
              }
            }
          : n
      )
    );
    alert("AI Chat Node Parameters Saved!");
  }

  return (
    <div className="space-y-4 text-slate-900 dark:text-slate-100 p-4">
      <h3 className="font-semibold text-base border-b pb-2">AI Chat Settings</h3>

      {/* Model Provider Selection */}
      <div>
        <label className="text-xs font-semibold block mb-1">Model Provider</label>
        <select
          value={modelprovider}
          onChange={(e) => setModelProvider(e.target.value)}
          className="w-full border rounded-md p-2 text-sm bg-background"
        >
          <option value="gemini">Google Gemini (gemini-1.5-flash)</option>
          <option value="groq">Groq (llama-3.3-70b)</option>
          <option value="openai">OpenAI (gpt-4o-mini)</option>
        </select>
      </div>

      {/* API Key Input */}
      <div>
        <label className="text-xs font-semibold block mb-1">API Key</label>
        <input
          type="password"
          value={apikey}
          onChange={(e) => setApikey(e.target.value)}
          placeholder="Enter your API key..."
          className="w-full border rounded-md p-2 text-sm bg-background font-mono"
        />
      </div>

      {/* Prompt Input */}
      <div>
        <label className="text-xs font-semibold block mb-1">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI anything (e.g. Write a summary of...)"
          className="w-full border rounded-md p-2 text-sm bg-background h-24"
        />
      </div>


      {/* Action Buttons */}
      <div className="flex gap-2">
       
        <Button
          type="button"
          variant="default"
          onClick={handleSaveNodeData}
          className="w-1/2"
        >
          Save Node
        </Button>       
      </div>
      <div>
        <label className="text-xs font-semibold block mb-1">Response</label>
        <textarea
          value={response}
          
          placeholder="Response from AI"
          className="w-full border rounded-md p-2 text-sm bg-background h-24"
        />
      </div>



    </div>
  );
}