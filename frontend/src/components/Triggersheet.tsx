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

/*
  type: "trigger" | "action" | "condition",
  input?: string | Record<string, unknown>,
  output?: string | Record<string, unknown>,
  id: string,
  position: { x: number, y: number },
  data: { label: string },

}
 */

//t


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

  /*
      setNodes((previous) => [
        ...previous,
        {
          type: "trigger", // Fixes the literal union type error
          id: (previous.length + 1).toString(),
          position: { x: 0, y: 100 },
          data: { label: `${triggerName} trigger` }
        }
      ])
  */

  return (
    <Sheet >
      <SheetTrigger render={<Button variant="outline">Add Node</Button>} />
      <SheetContent >

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



        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
