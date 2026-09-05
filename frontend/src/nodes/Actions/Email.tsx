import { Handle, Position } from "@xyflow/react";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/appcontext";
import type { NodeTypes, emailparams } from "@/types/types";
import { Button } from "@/components/ui/button";

export default function Email() {
  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-purple-500 rounded-xl p-3.5 shadow-md min-w-[220px] text-slate-900 dark:text-slate-100">
      {/* Node Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
          📧
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase block leading-none">
            Action
          </span>
          <h4 className="text-sm font-semibold leading-tight mt-0.5">Send Email</h4>
        </div>
      </div>

      {/* Input Connection Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-slate-900"
      />

      {/* Output Connection Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-slate-900"
      />
    </div>
  );
}

export function EmailParams({ node }: { node?: NodeTypes }) {
  const { setNodes } = useAppContext();

  const initialMetadata = (node?.data?.metadata as emailparams);

  const [to, setTo] = useState<string>(initialMetadata.to || "");
  const [from, setFrom] = useState<string>(initialMetadata.from || "");
  const [subject, setSubject] = useState<string>(initialMetadata.subject || "");
  const [messagebody, setMessagebody] = useState<string>(initialMetadata.messagebody || "");

  useEffect(() => {
    const meta = (node?.data?.metadata as emailparams) ;
    setTo(meta.to || "");
    setFrom(meta.from || "");
    setSubject(meta.subject || "");
    setMessagebody(meta.messagebody || "");
  }, [node?.id, node?.data?.metadata]);

  function handlesave() {
    if (!node) return;

    const updatedEmailParams: emailparams = {
      to,
      from,
      subject,
      messagebody,
    };

    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                metadata: updatedEmailParams,
              },
            }
          : n
      )
    );
    console.log(updatedEmailParams)
    alert("Email Node Parameters Saved!");

  }

  return (
    <div className="space-y-4 text-slate-900 dark:text-slate-100 p-4">
      <h3 className="font-semibold text-base border-b pb-2">Email Settings</h3>

      {/* From Address */}
      <div>
        <label className="text-xs font-semibold block mb-1">From</label>
        <input
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="sender@example.com"
          className="w-full border rounded-md p-2 text-sm bg-background"
        />
      </div>

      {/* To Address */}
      <div>
        <label className="text-xs font-semibold block mb-1">To</label>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="recipient@example.com"
          className="w-full border rounded-md p-2 text-sm bg-background"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="text-xs font-semibold block mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Email subject..."
          className="w-full border rounded-md p-2 text-sm bg-background"
        />
      </div>

      {/* Message Body */}
      <div>
        <label className="text-xs font-semibold block mb-1">Message Body</label>
        <textarea
          value={messagebody}
          onChange={(e) => setMessagebody(e.target.value)}
          placeholder="Write your email content here..."
          className="w-full border rounded-md p-2 text-sm bg-background h-28"
        />
      </div>

      {/* Save Button */}
      <Button
        type="button"
        variant="default"
        onClick={handlesave}
        className="w-full mt-2"
      >
        Save Parameters
      </Button>
    </div>
  );
}
