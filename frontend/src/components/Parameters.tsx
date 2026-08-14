import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { Button } from "./ui/button"



export default function Parameters({ node, onClose }: { node: any, onClose: () => void }) {
    return (
        <Sheet open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
            <SheetTrigger render={<Button variant="outline">Add Node</Button>} />
            PARAMETERS

            <SheetContent className={"overflow-y-scroll"} >

                <SheetHeader>
                    <SheetTitle>enter details</SheetTitle>
                    <SheetDescription>
                        entyer yout pai key
                    </SheetDescription>
                </SheetHeader>
                <div>
                    if(`${node}`.type === "httprequest"){
                        <input type="text " placeholder="enter api key" />
                    }
                    else if(`${node}`.type === "sendemail"){
                        <input type="text " placeholder="enter email" />
                    }
                    else if(`${node}`.type === "manual"){
                        <input type="text " placeholder="enter manual" />
                    }
                    else if(`${node}`.type === "schedule"){
                        <input type="text " placeholder="enter schedule" />
                    }
                    else if(`${node}`.type === "formsubmit"){
                        <input type="text " placeholder="enter formsubmit" />
                    }
                    else if(`${node}`.type === "ifelse"){
                        <input type="text " placeholder="enter ifelse" />
                    }
                    else if(`${node}`.type === "switch"){
                        <input type="text " placeholder="enter switch" />
                    }
                </div>
                <SheetFooter className="mt-4">
                    <SheetClose>
                        <Button variant="default" onClick={onClose}>Save & Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )

}