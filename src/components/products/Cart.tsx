"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
    Minus,
    Plus,
    Trash2,
    ShoppingCart,
    ShieldCheck,
    Truck,
    ArrowLeft,
    Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/app/(routes)/(public)/products/page";
import { clearCartAction, removeFromCartAction, updateCartAction } from "@/actions/cartActions.action";
import { cartResponse } from "@/interfaces/cartInterfaces";
import { useState } from "react";
import Checkout from "./Checkout";


export default function CartUi({ cartData }: { cartData: cartResponse | null }) {

    const [cart, setCart] = useState<cartResponse | null>(cartData || null);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    dispatchEvent(new CustomEvent("cartUpdated", { detail: cart?.numOfCartItems ?? 0 }));

    async function handleRemoveFromCart(productId: string) {
        setLoadingId(productId);
        const data: cartResponse = await removeFromCartAction(productId);
        if (data.status == "success") {
            setCart(data);
            dispatchEvent(new CustomEvent("cartUpdated", { detail: data.numOfCartItems }));
        }
        setLoadingId(null);
    }

    async function handleUpdateCart(productId: string, count: number) {
        setLoadingId(productId);
        const data = await updateCartAction(productId, count);
        if (data?.status == "success") {
            setCart(data);
        }
        setLoadingId(null);
    }

    async function handleClearCart() {
        setLoadingId("clear");
        const data: cartResponse = await clearCartAction();
        if (data.message == "success") {
            setCart(null);
            dispatchEvent(new CustomEvent("cartUpdated", { detail: 0 }));
        }
        setLoadingId(null);
    }


    return (
        <div className="container mx-auto px-4 py-8">

            <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Shopping Cart</h1>
                    <p className="text-sm mt-1 text-muted-foreground">

                        {cart ? `${cart.numOfCartItems} item${cart.numOfCartItems !== 1 ? "s" : ""} in your cart` : "Your cart is empty"}
                    </p>
                </div>

                <Button asChild variant="outline" className="gap-2 rounded-3xl">
                    <Link href="/products">
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">

                <div className="lg:col-span-8">
                    <Card className="overflow-hidden">

                        <CardContent className="p-0">
                            {cart ? (<ScrollArea className="h-105">
                                <div className="divide-y">
                                    {cart.data.products.map((item) => (
                                        <div key={item._id} className="p-4">

                                            <div className="flex gap-4 relative">
                                                {loadingId == item.product._id && <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/75">
                                                    <Loader2 className="animate-spin" />
                                                </div>}
                                                <div className="relative h-30 w-30 overflow-hidden rounded-lg border bg-muted">
                                                    <Image
                                                        src={item.product.imageCover}
                                                        alt={item.product.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="flex flex-1 flex-col gap-2">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <h3 className="line-clamp-1 font-semibold">{item.product.title}</h3>

                                                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                                                {item.product.brand && <Badge variant="secondary">{item.product.brand.name}</Badge>}
                                                                {item.product.category && (
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {item.product.category.name}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="shrink-0 text-right">
                                                            <div className="font-semibold">{formatPrice(item.price)}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                each
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-1 flex flex-wrap items-center justify-between gap-3">

                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                className="rounded-3xl"
                                                                variant="outline"
                                                                size="icon"
                                                                disabled={item.count <= 1}
                                                                aria-label="decrease"
                                                                onClick={() => handleUpdateCart(item.product._id, item.count - 1)}
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </Button>

                                                            <div className="w-10 text-center text-sm font-medium">
                                                                {item.count}
                                                            </div>

                                                            <Button
                                                                className="rounded-3xl"
                                                                variant="outline"
                                                                size="icon"
                                                                disabled={item.count >= item.product.quantity}
                                                                aria-label="increase"
                                                                onClick={() => handleUpdateCart(item.product._id, item.count + 1)}
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>


                                                        <Button
                                                            variant="ghost"
                                                            className="gap-2 rounded-3xl text-destructive hover:text-destructive"
                                                            onClick={() => handleRemoveFromCart(item.product._id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove
                                                        </Button>
                                                    </div>

                                                    <div className="text-sm text-muted-foreground">
                                                        Line total:{" "}
                                                        <span className="font-medium text-foreground">
                                                            {formatPrice(item.price * item.count)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            ) : (
                                <div className="flex min-h-70 flex-col items-center justify-center gap-3 p-8 text-center">
                                    <div className="rounded-full border bg-muted p-3">
                                        <ShoppingCart className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Your cart is empty</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Add items to your cart to see them here.
                                        </p>
                                    </div>

                                    <Button asChild className="mt-2 rounded-3xl">
                                        <Link href="/products">Browse Products</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>

                        {cart && (
                            <>
                                <Separator />
                                <CardFooter className="flex items-center justify-between gap-3 py-1">
                                    <div className="text-sm text-muted-foreground">
                                        you can adjust quantities anytime before checkout !
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="text-destructive rounded-3xl hover:text-destructive"
                                        onClick={() => handleClearCart()}
                                    >
                                        {loadingId == "clear" && <Loader2 className="animate-spin" />} Clear Cart
                                    </Button>
                                </CardFooter>
                            </>
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-30">
                        <Card>
                            <CardHeader className="py-4">
                                <CardTitle className="text-base">Order Summary</CardTitle>
                            </CardHeader>

                            <Separator />

                            <CardContent className="space-y-4 py-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Subtotal ({cart?.numOfCartItems || 0} item{cart?.numOfCartItems !== 1 ? "s" : ""})
                                    </span>
                                    <span className="font-medium">{formatPrice(cart?.data.totalCartPrice || 0)}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium text-emerald-600">
                                        Free
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Total</span>
                                    <span className="text-lg font-bold">{formatPrice(cart?.data.totalCartPrice || 0)}</span>
                                </div>

                                <Checkout cartNumOfItems={cart?.numOfCartItems || 0} cartId={cart?.data?._id }/>

                                <div className="grid gap-2 pt-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" />
                                        Secure payments
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4" />
                                        Fast delivery options
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}