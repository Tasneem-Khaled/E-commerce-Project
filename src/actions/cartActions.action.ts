"use server"

import { authOptions } from "@/helpers/authOptions";
import { cartResponse, ShippingAddress } from "@/interfaces/cartInterfaces";
import { checkoutResponse } from "@/interfaces/checkoutInterfaces";
import { getServerSession } from "next-auth";


export async function getCart() {
    const session = await getServerSession(authOptions);
    const response = await fetch(process.env.API_URL + "cart", {
        headers: {
            token: session?.accessToken as string
        }
    });

    const data: cartResponse = await response.json();
    return data;
}

export default async function addToCartAction(productId: string) {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(process.env.API_URL + "cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: session?.accessToken as string
            },
            body: JSON.stringify({ productId })
        });

        const data: cartResponse = await response.json();
        return data;
    }
}

export async function checkoutAction(cartId: string | undefined , shippingAddress : ShippingAddress){
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(process.env.API_URL + "orders/checkout-session/"+ cartId +"?url=" + process.env.BASE_URL , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: session?.accessToken as string
            },
            body: JSON.stringify({ shippingAddress })
        });

        const data: checkoutResponse = await response.json();
        return data;
    }
}

export async function checkoutCashAction(cartId: string | undefined , shippingAddress : ShippingAddress){
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(process.env.API_URL + "orders/"+ cartId  , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: session?.accessToken as string
            },
            body: JSON.stringify({ shippingAddress })
        });

        const data: checkoutResponse = await response.json();
        return data;
    }
}

export async function updateCartAction(productId: string, count: number) {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(process.env.API_URL + "cart/" + productId , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: session?.accessToken as string
            },
            body: JSON.stringify({ count })
        });

        const data: cartResponse = await response.json();
        return data;
    }
}

export async function removeFromCartAction(productId: string) {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(process.env.API_URL + "cart/" + productId, {
            method: "DELETE",
            headers: {
                token: session?.accessToken as string
            },
        });

        const data = await response.json();
        return data;
    }
}

export async function clearCartAction() {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(process.env.API_URL + "cart", {
            method: "DELETE",
            headers: {
                token: session?.accessToken as string
            },
        });

        const data = await response.json();
        return data;
    }
}

