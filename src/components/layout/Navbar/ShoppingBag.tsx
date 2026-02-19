"use client"
import { Badge } from '@/components/ui/badge'
import { ShoppingBagIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function ShoppingBag( { cartCount ,userId }: { cartCount: number , userId : string}) {

    useEffect(()=>{
        console.log("ls", userId);
        
        if (userId) {
        localStorage.setItem("userId", userId)
    }
    },[userId])
    const [cartCountState, setCartCount] = useState(cartCount);

     useEffect(() => {function handleCartUpdated(event: CustomEvent) {
                setCartCount(event.detail);
            }

        window.addEventListener("cartUpdated", handleCartUpdated as EventListener);
    },[])

    return (

        <li><Link href={"/cart"} className="relative inline-flex items-center">
            <ShoppingBagIcon className="size-7 md:size-5" />
            {cartCountState > 0 &&
            <Badge className="absolute -top-1 -right-1 rounded-full text-white text-[10px] px-1 min-w-3 h-3 flex items-center justify-center">
                {cartCountState}
            </Badge>
            }
        </Link>
        </li>

    )
}
