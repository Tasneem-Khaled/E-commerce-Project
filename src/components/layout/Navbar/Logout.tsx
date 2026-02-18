"use client"
import { signOut } from "next-auth/react";


export default function Logout() {
    return (
        <>
            <a onClick={()=> signOut({
                callbackUrl: "/"
            })} className="block px-4 py-2 text-sm hover:bg-accent rounded-md font-semibold text-accent-foreground duration-300">Logout</a>

        </>
    )
}
