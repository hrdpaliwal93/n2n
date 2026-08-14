import { Button } from "@/components/ui/button"
import { Triggers, Actions, Conditions, type NodeDefinition } from '../nodes/listofnodes'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAppContext } from "@/context/appcontext"

export default function Triggersheet() {
  const { setNodes } = useAppContext()

  function createNodeHandler(nodeDef: NodeDefinition) {
    setNodes((previous) => [
      ...previous,
      {
        id: `node-${Date.now()}`,
        type: nodeDef.kind,
        kind: nodeDef.kind,
        position: { x: 100 + (previous.length * 40), y: 100 + (previous.length * 40) },
        data: { label: nodeDef.name },
      },
    ])
  }

  return (
    <Sheet>
      <div className="p-4 flex gap-2 border-b bg-background/95 backdrop-blur z-10 relative">
        <SheetTrigger render={<Button variant="default">Add Node</Button>} />
        <Button variant="destructive" onClick={() => setNodes([])}>Clear Workflow</Button>
      </div>

      <SheetContent className="overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Triggers initiate your workflow based on specific events.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-2 mb-6">
          {Triggers.map((element) => (
            <div
              key={element.kind}
              onClick={() => createNodeHandler(element)}
              className="cursor-pointer border rounded-lg p-3 hover:bg-accent transition-colors"
            >
              <div className="font-semibold text-sm">{element.name}</div>
              <p className="text-xs text-muted-foreground mt-0.5">{element.description}</p>
            </div>
          ))}
        </div>

        <SheetHeader className="mb-4">
          <SheetTitle>Select Actions</SheetTitle>
          <SheetDescription>
            Actions perform tasks in your workflow.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2 mb-6">
          {Actions.map((element) => (
            <div
              key={element.kind}
              onClick={() => createNodeHandler(element)}
              className="cursor-pointer border rounded-lg p-3 hover:bg-accent transition-colors"
            >
              <div className="font-semibold text-sm">{element.name}</div>
              <p className="text-xs text-muted-foreground mt-0.5">{element.description}</p>
            </div>
          ))}
        </div>

        <SheetHeader className="mb-4">
          <SheetTitle>Select Conditions</SheetTitle>
          <SheetDescription>
            Conditions branch your workflow logic.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2 mb-6">
          {Conditions.map((element) => (
            <div
              key={element.kind}
              onClick={() => createNodeHandler(element)}
              className="cursor-pointer border rounded-lg p-3 hover:bg-accent transition-colors"
            >
              <div className="font-semibold text-sm">{element.name}</div>
              <p className="text-xs text-muted-foreground mt-0.5">{element.description}</p>
            </div>
          ))}
        </div>

        <SheetFooter className="mt-6">
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

