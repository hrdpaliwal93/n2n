import { Button } from "@/components/ui/button"
import { Triggers } from '../nodes/Triggers/trigger'
import { Actions } from '../nodes/Actions/actions'
import { Conditions } from "@/nodes/conditions/conditions"
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


  function createNodeHandler(type: string, label: string) {

    setNodes((previous) => [
      ...previous, {
        type: type as "trigger" | "action" | "condition",
        id: (previous.length + 1).toString(),
        position: { x: 0, y: 100 },
        data: { label: `${label}` },

      },
    ])
  }


  return (
    <Sheet >
      <SheetTrigger render={<Button variant="outline">Add Node</Button>} />
      <Button variant="destructive" onClick={() => setNodes([])}>Clear Workflow</Button>
      <SheetContent className={"overflow-y-scroll"}>

        <SheetHeader>
          <SheetTitle>select Trigger</SheetTitle>
          <SheetDescription>
            Trigger is some Event that initiates your workflow.
          </SheetDescription>
        </SheetHeader>
        {

          Triggers.map((element) => (
            <div onClick={() => createNodeHandler("trigger", element.name)}
              className="cursor-pointer border-t border-b p-2 hover:bg-muted/50" key={element.name}> {element.name}<p>{element.description}</p></div>
          ))

        }
        <SheetHeader>
          <SheetTitle>select Actions</SheetTitle>
          <SheetDescription>
            Action is some task that your workflow will perform.
          </SheetDescription>
        </SheetHeader>
        {

          Actions.map((element) => (
            <div onClick={() => createNodeHandler("action", element.name)}
              className="cursor-pointer border-t border-b p-2 hover:bg-muted/50" key={element.name}> {element.name}<p>{element.description}</p></div>
          ))

        }
        <SheetHeader>
          <SheetTitle>select Conditions</SheetTitle>
          <SheetDescription>
            Conditions are some Event that initiates your workflow.
          </SheetDescription>
        </SheetHeader>
        {

          Conditions.map((element) => (
            <div onClick={() => createNodeHandler("condition", element.name)}
              className="cursor-pointer border-t border-b p-2 hover:bg-muted/50" key={element.name}> {element.name}<p>{element.description}</p></div>
          ))

        }

        <SheetFooter>
          <SheetClose render={<Button variant="default">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
