"use client"
import { Button } from '../ui/button'
import { Loader2, ShoppingCartIcon } from 'lucide-react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import addToCartAction from '@/actions/cartActions.action';
import { useRouter } from 'next/navigation';


export default function AddToCartBtn({ productId }: { productId: string }) {
    const router = useRouter();
    const [isloading, setIsLoading] = useState(false);
    async function handleAddToCart(productId: string) {
        setIsLoading(true);
        try {
            const data = await addToCartAction(productId);
            if (data == null) {
                router.push("/login");
                return;
            }
            toast.success(data?.message || "Item added to cart successfully!");
            dispatchEvent(new CustomEvent("cartUpdated", { detail: data.numOfCartItems }));
        } catch (error) {
            toast.error("Failed to add item to cart. Please try again.");
            console.log(error);
            
        }
        setIsLoading(false);
    }



    return (
        <Button className="grow rounded-4xl" onClick={() => handleAddToCart(productId)} disabled={isloading}>
            {isloading ? <Loader2 className="animate-spin" /> : <ShoppingCartIcon />} Add to cart

        </Button>
    )
}
