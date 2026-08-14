import { Handle, Position } from '@xyflow/react';
import { Clock } from 'lucide-react';

export default function Schedule({ data }: any) {
  return (
    <div className="bg-background border-2 border-blue-500 rounded-xl p-3 shadow-md min-w-[220px] text-foreground">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider text-blue-500">Trigger</h4>
          <p className="text-sm font-medium">{data?.label || 'Schedule Trigger'}</p>
        </div>
      </div>
      <div className="mt-2 text-xs bg-muted/60 p-2 rounded-md space-y-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Interval:</span>
          <span className="font-medium">Every 1 hour</span>
        </div>
      </div>
      
      {/* Output connection point */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500 border-2 border-background"
      />
    </div>
  );
}
