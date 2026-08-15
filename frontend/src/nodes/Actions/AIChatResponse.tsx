import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/appcontext";
import type { NodeTypes } from "@/pages/CreateWorkFlow";
import { Button } from "@/components/ui/button";

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
  const [model, setModel] = useState(node?.data?.method || "groq");
  const [api, setApi] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSendAIRequest() {
    if (!api.trim()) {
      setErrorMsg("Please enter your API Key");
      return;
    }
    if (!prompt.trim()) {
      setErrorMsg("Please enter a prompt");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setAiResponse("");

    try {
        //send response to my server and wait for response
    }catch(e){
        setErrorMsg(e.message)
        setLoading(false)
    }
  }
 function handleSaveNodeData() {
    if (!node) return;
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                model: model,
                api: api,
                body: { prompt, response: aiResponse }
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
          value={model}
          onChange={(e) => setModel(e.target.value)}
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
          value={api}
          onChange={(e) => setApi(e.target.value)}
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

      {errorMsg && (
        <p className="text-xs text-red-500 font-medium">⚠️ {errorMsg}</p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          
          variant="secondary"
          onClick={handleSendAIRequest}
          disabled={loading}
          className="w-1/2"
        >
          {loading ? "Sending..." : "Test Request"}
        </Button>

        <Button
          type="button"
          variant="default"
          onClick={handleSaveNodeData}
          className="w-1/2"
        >
          Save Node
        </Button>
      </div>

      {/* AI Response Display */}
      {aiResponse && (
        <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-md">
          <label className="text-xs font-bold text-purple-700 dark:text-purple-300 block mb-1">
            🤖 AI Response:
          </label>
          <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
            {aiResponse}
          </p>
        </div>
      )}
    </div>
  );
}