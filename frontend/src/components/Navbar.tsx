import { useAppContext } from "@/context/appcontext"
import { Button } from "./ui/button"
export default function Navbar() {
    const { navigate, user, logout } = useAppContext()
    return <div className="flex justify-evenly items-center w-full h-16 border-1">
        this is a nav
        {user ? (
            <div className="flex flex-evenly gap-2 items-center">
                <h1 className="text-green-800 ">welcome {user}</h1>
                <Button onClick={logout}
                >logput</Button>
            </div>

        ) :

            <Button
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/login")}
            >
                Log In / Sign Up
            </Button>
        }

    </div>
}