import { Handle, Position } from "@xyflow/react";
import { useEffect, useState } from "react";

import { useAppContext } from "@/context/appcontext";
import type { NodeTypes, websearchparams } from "@/types/types";
import { Button } from "@/components/ui/button";

// WebSearch Node Component for Canvas
export default function WebSearch() {
  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-blue-500 rounded-xl p-3.5 shadow-md min-w-[220px] text-slate-900 dark:text-slate-100">
      {/* Node Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-4 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
          🔍
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase block leading-none">
            Action
          </span>
          <h4 className="text-sm font-semibold leading-tight mt-0.5">Web Search</h4>
        </div>
      </div>

      {/* Input Connection Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white dark:!border-slate-900"
      />

      {/* Output Connection Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white dark:!border-slate-900"
      />
    </div>
  );
}

import { toast } from "react-toastify";

// WebSearch Parameters Panel Component
export function WebSearchParams({ node }: { node?: NodeTypes }) {
  const output = node?.output;

  const { setNodes } = useAppContext();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const searchParams: websearchparams = {
    query,
    response,
  };

  useEffect(() => {
    const meta = (node?.data?.metadata as websearchparams) || {};
    setQuery(meta?.query || "");
  }, [node?.id, node?.data?.metadata]);

  useEffect(() => {
    if (output) {
      setResponse(typeof output === "object" ? JSON.stringify(output) : String(output));
    }
  }, [output]);

  function handleSaveNodeData() {
    if (!node) return;
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                metadata: searchParams,
              },
            }
          : n
      )
    );
    toast.success("Web Search Node Parameters Saved!");
  }

  return (
    <div className="space-y-4 text-slate-900 dark:text-slate-100 p-4">
      <h3 className="font-semibold text-base border-b pb-2">Web Search Settings</h3>

      {/* Search Query Input */}
      <div>
        <label className="text-xs font-semibold block mb-1">Search Query / Topic</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What to search on the web..."
          className="w-full border rounded-md p-2 text-sm bg-background h-24"
        />
      </div>

      {/* Save Button */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="default"
          onClick={handleSaveNodeData}
          className="w-full"
        >
          Save Node
        </Button>
      </div>

      {/* Search Response Display */}
      <div>
        <label className="text-xs font-semibold block mb-1">Search Result Response</label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Search response..."
          className="w-full border rounded-md p-2 text-sm bg-background h-44"
        />
      </div>
    </div>
  );
}
