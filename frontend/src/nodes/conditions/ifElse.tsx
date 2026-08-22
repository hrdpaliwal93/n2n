import { Position, Handle } from '@xyflow/react';

export default function ifElse() {
  return (
    <div className="relative bg-white dark:bg-slate-900 border-2 border-purple-500 rounded-xl p-3.5 shadow-md min-w-[220px] text-slate-900 dark:text-slate-100">
      {/* Node Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
          📋
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase block leading-none">
            Condition
          </span>
          <h4 className="text-sm font-semibold leading-tight mt-0.5">if-else</h4>
        </div>
      </div>

      {/* Visual Labels near the Handles */}
      <div className="flex flex-col items-end gap-3 pr-2 my-2">
        <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
          IF (True)
        </span>
        <span className="text-xs font-bold text-green-500 uppercase tracking-wide">
          ELSE (False)
        </span>
      </div>

      {/* Target (Input) Handle */}
      <Handle 
        type="target" 
        position={Position.Left}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-slate-900" 
      />

      {/* Source (Output) Handles */}
      <Handle 
        type="source" 
        position={Position.Right} 
        id="if" 
        className="!top-[42%] !bg-red-500 !w-3 !h-3 !border-2 !border-white dark:!border-slate-900"
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="else" 
        className="!top-[72%] !bg-green-500 !w-3 !h-3 !border-2 !border-white dark:!border-slate-900"
      />
    </div>
  );
}
