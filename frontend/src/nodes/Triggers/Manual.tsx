import { Position, Handle, type NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react'; // Or any Play icon

export function Manual(props: NodeProps) {
  function handleExecuteManualTrigger(e: React.MouseEvent) {
    e.stopPropagation(); // Prevents selecting/dragging the node when clicking the button
    console.log("Executing manual trigger for node ID:", props.id);
    
    // TODO: Call your backend execution API endpoint:
    // fetch('/api/workflow/execute', { method: 'POST', body: JSON.stringify({ triggerNodeId: props.id }) })
  }

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-xl p-3.5 shadow-md min-w-[220px] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
          ▶️
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase block leading-none">
            Trigger
          </span>
          <h4 className="text-sm font-semibold leading-tight mt-0.5">Manual Trigger</h4>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
        Runs workflow manually when clicked.
      </p>

      {/* Test / Execute Button */}
      <button
        onClick={handleExecuteManualTrigger}
        className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-md transition cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 fill-white" />
        Test Step
      </button>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-white dark:!border-slate-900"
      />
    </div>
  );
}
