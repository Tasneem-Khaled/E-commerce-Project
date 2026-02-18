"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { PackageOpen, RefreshCw } from "lucide-react";
import { formatPrice } from "@/app/(routes)/(public)/products/page";
import { Root } from "@/interfaces/allOrdersInterfaces";
import Link from "next/link";

export default function Orders() {
    const [orders, setOrders] = useState<Root>([]);
    const [loading, setLoading] = useState(true);

    async function getOrders() {
        try {
            setLoading(true);

            const userId = localStorage.getItem("userId");
            if (!userId) {
                setOrders([]);
                return;
            }

            const response = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "orders/user/" + userId
            );
            const data = await response.json();


            setOrders(data);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-10 text-sm text-muted-foreground">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold">My Orders</h1>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-muted/30 p-10 text-center">
                    <div className="mb-4 rounded-full bg-background p-4 shadow-sm">
                        <PackageOpen className="h-8 w-8 text-muted-foreground" />
                    </div>

                    <h3 className="text-lg font-semibold">No orders yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Looks like you haven't placed any orders.
                    </p>

                    <Button asChild className="mt-2 rounded-3xl">
                        <Link href="/products">Start Shopping</Link>
                    </Button>


                </div>
            ) : (
                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className="font-medium">
                                    {order._id}
                                </TableCell>

                                <TableCell>
                                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                                </TableCell>

                                <TableCell>
                                    <Badge variant="secondary">
                                        {order.paymentMethodType}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {order.isDelivered ? (
                                        <Badge>Delivered</Badge>
                                    ) : order.isPaid ? (
                                        <Badge variant="outline">Paid</Badge>
                                    ) : (
                                        <Badge variant="destructive">Pending</Badge>
                                    )}
                                </TableCell>

                                <TableCell className="text-right">
                                    {formatPrice(order.totalOrderPrice)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}