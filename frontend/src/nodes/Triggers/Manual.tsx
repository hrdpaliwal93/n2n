import { Handle, Position, type  NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react';

export default function Manual({ data }: NodeProps) {
  return (
    <div className="bg-background border-2 border-emerald-500 rounded-xl p-3 shadow-md min-w-[200px] text-foreground">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
          <Play className="w-4 h-4 fill-emerald-500" />
        </div>
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider text-emerald-500">Trigger</h4>
          <p className="text-sm font-medium">{data?.label || 'Manual Trigger'}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-1">Runs workflow manually on demand</p>
      
      {/* Output connection point */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-emerald-500 border-2 border-background"
      />
    </div>
  );
}
