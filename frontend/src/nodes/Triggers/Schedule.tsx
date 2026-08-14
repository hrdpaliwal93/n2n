import { Position, Handle, type NodeProps } from '@xyflow/react';
import { Clock } from 'lucide-react';
import { useState } from 'react';

export function Schedule(props: NodeProps) {
  const [interval, setInterval] = useState('every_hour');

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-blue-500 rounded-xl p-3.5 shadow-md min-w-[230px] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
          ⏰
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase block leading-none">
            Trigger
          </span>
          <h4 className="text-sm font-semibold leading-tight mt-0.5">Schedule Trigger</h4>
        </div>
      </div>

      {/* Interval Selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Execute Interval
        </label>
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="w-full text-xs px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
        >
          <option value="every_5m">Every 5 minutes</option>
       
          <option value="every_hour">Every hour</option>
          <option value="every_morning">Every morning</option>
          <option value="every_day">Every day at midnight</option>
         
        </select>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white dark:!border-slate-900"
      />
    </div>
  );
}
