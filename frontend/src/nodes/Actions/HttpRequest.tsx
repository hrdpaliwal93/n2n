import { Position, Handle } from '@xyflow/react';
import { useState, useEffect } from 'react';
import type { NodeTypes } from '@/types/types';
import { useAppContext } from '@/context/appcontext';
import { Button } from '@/components/ui/button';
import { type httprequestparams } from '@/types/types';

export default function httprequest() {
  return <div className="bg-white dark:bg-slate-900 border-2 border-purple-500 rounded-xl p-3.5 shadow-md min-w-[220px] text-slate-900 dark:text-slate-100">
    {/* Node Header */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-4 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
        📋
      </div>
      <div>
        <span className="text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase block leading-none">
          Action
        </span>
        <h4 className="text-sm font-semibold leading-tight mt-0.5">HTTP Request</h4>
      </div>
    </div>


    {/* Output Connection Handle */}
    <Handle
      type="source"
      position={Position.Right}
      className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-slate-900"
    />

    <Handle type="target" className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-slate-900" position={Position.Left} />
  </div>
}


export function HttpRequestParams({ node }: { node: NodeTypes }) {
  const { setNodes } = useAppContext();

  const metadata = (node?.data?.metadata as httprequestparams);

  const [method, setMethod] = useState<string>(metadata.method || "GET");
  const [url, setUrl] = useState<string>(metadata.url || "");
  const [headerstext, setheaderstext] = useState<string>(
    metadata.headers ? JSON.stringify(metadata.headers, null, 2) : ""
  );
  const [bodytext, setbodytext] = useState<string>(
    metadata.body ? JSON.stringify(metadata.body, null, 2) : ""
  );

  useEffect(() => {
    const meta = (node?.data?.metadata as httprequestparams) ;
    setMethod(meta.method || "GET");
    setUrl(meta.url || "");
    setheaderstext(meta.headers ? JSON.stringify(meta.headers, null, 2) : "");
    setbodytext(meta.body ? JSON.stringify(meta.body, null, 2) : "");
  }, [node?.id, node?.data?.metadata]);

  function handleSave() {
    let parsedHeaders: Record<string, unknown> = {};
    let parsedBody: Record<string, unknown> = {};

    try {
      if (headerstext.trim()) parsedHeaders = JSON.parse(headerstext);
    } catch {
      headerstext.split("\n").forEach((line) => {
        const [k, v] = line.split(":");
        if (k && v) parsedHeaders[k.trim()] = v.trim();
      });
    }

    try {
      if (bodytext.trim()) parsedBody = JSON.parse(bodytext);
    } catch {
      bodytext.split("\n").forEach((line) => {
        const [k, v] = line.split(":");
        if (k && v) parsedBody[k.trim()] = v.trim();
      });
    }

    const updatedParams: httprequestparams = {
      method: method as "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
      url,
      headers: parsedHeaders,
      body: parsedBody,
    };

    setNodes((previousNodes) =>
      previousNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                metadata: updatedParams,
              },
            }
          : n
      )
    );
    alert("Parameters saved successfully!");
  }

  return (
    <div className="space-y-4 text-slate-900 dark:text-slate-100 p-4">
      <h3 className="font-semibold text-base border-b pb-2">HTTP Request Settings</h3>

      <div>
        <label className="text-xs font-semibold block mb-1">Method</label>
        <select
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          className="w-full border rounded-md p-2 text-sm bg-background"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">URL</label>
        <input
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          type="text"
          placeholder="https://api.example.com"
          className="w-full border rounded-md p-2 text-sm bg-background"
        />
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">Headers</label>
        <textarea
          value={headerstext}
          onChange={(e) => setheaderstext(e.target.value)}
          placeholder='{"Content-Type": "application/json"}'
          className="w-full border rounded-md p-2 text-sm bg-background h-20 font-mono text-xs"
        />
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">Body</label>
        <textarea
          value={bodytext}
          onChange={(e) => setbodytext(e.target.value)}
          placeholder='{ "key": "value" }'
          className="w-full border rounded-md p-2 text-sm bg-background h-24 font-mono text-xs"
        />
      </div>

      <Button variant="default" onClick={handleSave} className="w-full mt-2">
        Save Parameters
      </Button>
    </div>
  );
}
