import { Button } from "@/components/ui/button"
import { Triggers, Actions, Conditions } from "@/nodes/nodelist"
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


  function createNodeHandler(category: string, label: string, type:string) {

    setNodes((previous) => [
      ...previous, {
        category:category as  "trigger" | "action" | "condition",
        type:type,

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
        <div className="flex flex-col px-2 gap-4">
          {

            Triggers.map((element) => (
              <div onClick={() => createNodeHandler("trigger", element.name, element.type)}
                className="cursor-pointer border-1 border-black rounded-lg p-2 hover:bg-muted/50" key={element.name}> {element.name}<p>{element.description}</p></div>
            ))

          }

        </div>

        <SheetHeader>
          <SheetTitle>select Actions</SheetTitle>
          <SheetDescription>
            Action is some task that your workflow will perform.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col px-2 gap-4">
          {

            Actions.map((element) => (
              <div onClick={() => createNodeHandler("action", element.name, element.type)}
                className="cursor-pointer border-1 border-black rounded-lg p-2 hover:bg-muted/50" key={element.name}> {element.name}<p>{element.description}</p></div>
            ))

          }
        </div>
        <SheetHeader>
          <SheetTitle>select Conditions</SheetTitle>
          <SheetDescription>
            Conditions are some Event that initiates your workflow.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col px-2 gap-4">
          {

            Conditions.map((element) => (
              <div onClick={() => createNodeHandler("condition", element.name, element.type)}
                className="cursor-pointer border-1 border-black rounded-lg p-2 hover:bg-muted/50" key={element.name}> {element.name}<p>{element.description}</p></div>
            ))

          }
        </div>

        <SheetFooter>
          <SheetClose render={<Button variant="default">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
