import { Position, Handle } from '@xyflow/react';
import { useState } from 'react';
import type { NodeTypes } from '@/types/types';
import { useAppContext } from '@/context/appcontext';
import { Button } from '@/components/ui/button';


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

      <Handle type="target"  className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-slate-900" position={Position.Left} />
  </div>
}


export function HttpRequestParams({ node }: { node: NodeTypes }) {

  const { setNodes } = useAppContext()
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Record<string, unknown>>({});
  const [body, setBody] = useState<Record<string, unknown>>({});


  function handleSave() {

    setNodes((previousNodes) =>
      previousNodes.map((n) =>
        n.id === node.id
          ? {
            ...n,
            data: {
              ...n.data,
              method,
              url,
              headers,
              body: body,
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
        <select onChange={(e) => setMethod(e.target.value)}
          className="w-full border rounded-md p-2 text-sm bg-background">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">URL</label>
        <input onChange={(e) => setUrl(e.target.value)}
          type="text" placeholder="https://api.example.com" className="w-full border rounded-md p-2 text-sm bg-background" />
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">Headers</label>
        <input onChange={(e) => {
          const final = JSON.parse(e.target.value)
          setHeaders(final)
        }}
          type="text" placeholder="e.g. Authorization: Bearer token" className="w-full border rounded-md p-2 text-sm bg-background" />
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">Body</label>
        <textarea
          onChange={(e) => {

            const final = JSON.parse(e.target.value)
            setBody(final)
          }}
          placeholder='{ "key": "value" }' className="w-full border rounded-md p-2 text-sm bg-background h-24 font-mono text-xs" />
      </div>


      <Button variant='default' onClick={handleSave} className="w-full mt-2">
        Save Parameters


      </Button>
    </div>
  );
}
