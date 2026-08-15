import { Position, Handle} from '@xyflow/react';
import type { NodeTypes } from '@/pages/CreateWorkFlow';

export default function httprequest(){
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
    </div>
}

export function HttpRequestParams({ node }: { node: NodeTypes }) {
  return (
    <div className="space-y-4 text-slate-900 dark:text-slate-100 p-4">
      <h3 className="font-semibold text-base border-b pb-2">HTTP Request Settings</h3>
      
      <div>
        <label className="text-xs font-semibold block mb-1">Method</label>
        <select className="w-full border rounded-md p-2 text-sm bg-background">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">URL</label>
        <input type="text" placeholder="https://api.example.com" className="w-full border rounded-md p-2 text-sm bg-background" />
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">Headers</label>
        <input type="text" placeholder="e.g. Authorization: Bearer token" className="w-full border rounded-md p-2 text-sm bg-background" />
      </div>

      <div>
        <label className="text-xs font-semibold block mb-1">Body</label>
        <textarea placeholder='{ "key": "value" }' className="w-full border rounded-md p-2 text-sm bg-background h-24 font-mono text-xs" />
      </div>
    </div>
  );
}
