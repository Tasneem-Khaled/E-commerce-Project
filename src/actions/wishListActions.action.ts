"use server"

import { authOptions } from "@/helpers/authOptions";
import { WishlisResponse } from "@/interfaces/wishListInterfaces";
import { getServerSession } from "next-auth";


export async function getWishlist() {
    const session = await getServerSession(authOptions);
    const response = await fetch(process.env.API_URL + "wishlist", {
        headers: {
            token: session?.accessToken as string
        }
    });

    const data : WishlisResponse = await response.json();
    return data;
}

export default async function addToWishlistAction(productId: string) {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(process.env.API_URL + "wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: session?.accessToken as string
            },
            body: JSON.stringify({ productId })
        });

        const data: WishlisResponse = await response.json();
        return data;
    }
}

export async function removeFromWishlistAction(productId: string) {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(process.env.API_URL + "wishlist/" + productId, {
            method: "DELETE",
            headers: {
                token: session?.accessToken as string
            },
        });

        const data = await response.json();
        return data;
    }
}


