import { Button } from "@/components/ui/button"

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

export default function Triggersheet() {
  return (
    <Sheet >
      <SheetTrigger  render={<Button variant="outline">Add Node</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>select Trigger</SheetTitle>
          <SheetDescription>
          Trigger is some Event that initiates your workflow.
          </SheetDescription>
        </SheetHeader>
       <h1>54545</h1>
       <h1>wewe</h1>
       <h1>ewewe</h1>
       <h1>eere</h1>
       <h1>ewe</h1>
       <h1>eew</h1>
       <SheetHeader>
          <SheetTitle>select Action</SheetTitle>
          <SheetDescription>
          select action to perform something "web request, data fetching"
          </SheetDescription>
        </SheetHeader>
        <h1>54545</h1>
       <h1>wewe</h1>
       <h1>ewewe</h1>
       <h1>eere</h1>
       <h1>ewe</h1>
       <h1>eew</h1>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
