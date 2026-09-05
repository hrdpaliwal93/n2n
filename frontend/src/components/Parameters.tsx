import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import type { NodeTypes } from "@/types/types";
import { useAppContext } from "@/context/appcontext";
import { HttpRequestParams } from "@/nodes/Actions/HttpRequest";
import {AIChatParams }from "@/nodes/Actions/AIChatResponse";
import {formsubmitparams} from "@/nodes/Triggers/Formsubmit";
import { EmailParams } from "@/nodes/Actions/Email";

// Parameter Form Registry Map
const PARAM_COMPONENTS: Record<string, React.ComponentType<{ node: NodeTypes }>> = {
    httprequest: HttpRequestParams,
    aichat: AIChatParams,
    formsubmit: formsubmitparams,
    sendemail: EmailParams
};

export default function Parameters({ node, onClose }: { node: NodeTypes, onClose: () => void }) {
    const { setNodes, setEdges } = useAppContext();

    // Look up component based on node type
    const ParamForm = PARAM_COMPONENTS[node.type];

    return (
        <Sheet open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
            <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>Configure Node</SheetTitle>
                    <SheetDescription>
                        Set properties and configuration for {node.data?.label || node.type}.
                    </SheetDescription>
                </SheetHeader>

                <div className="py-4">
                    {ParamForm ? (
                        <ParamForm node={node} />
                    ) : (
                        <div className="p-4 border border-dashed rounded-md text-center text-sm text-muted-foreground">
                            No configurable parameters available for node type: <span className="font-mono font-semibold">{node.type}</span>
                        </div>
                    )}
                </div>

                <SheetFooter className="mt-4 flex gap-2">
                    <Button variant="destructive" onClick={() => {
                        setNodes((prevNodes) => prevNodes.filter((n) => n.id !== node.id));
                        setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== node.id && edge.target !== node.id));
                        onClose();
                    }}>
                        Delete Node
                    </Button>
                    <SheetClose>
                        <Button variant="default" onClick={onClose}>Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
