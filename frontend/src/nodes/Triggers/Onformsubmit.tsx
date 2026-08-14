import { Handle, Position } from "@xyflow/react";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Onformsubmit({ data }: any) {
  const [formName, setFormName] = useState(data?.parameters?.formName || "Contact Form");

  return (
    <div className="bg-background border-2 border-purple-500 rounded-xl p-3 shadow-md min-w-[220px] text-foreground">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-500">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider text-purple-500">Trigger</h4>
          <p className="text-sm font-medium">{data?.label || "Form Submit"}</p>
        </div>
      </div>
      
      <div className="space-y-1.5 mt-2">
        <label className="text-[10px] uppercase font-semibold text-muted-foreground">Form Name</label>
        <Input 
          type="text" 
          value={formName} 
          onChange={(e) => setFormName(e.target.value)}
          placeholder="e.g. Lead Form" 
          className="h-7 text-xs bg-muted/40"
        />
      </div>
      
      {/* Output connection point */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-purple-500 border-2 border-background"
      />
    </div>
  );
}
