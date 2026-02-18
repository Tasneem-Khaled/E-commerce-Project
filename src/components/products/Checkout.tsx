"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Building2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { checkoutAction, checkoutCashAction } from "@/actions/cartActions.action";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Checkout({
    cartNumOfItems,
    cartId,
}: {
    cartNumOfItems: number;
    cartId?: string;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState<"credit" | "cash">("credit");

    const city = useRef<null | HTMLInputElement>(null);
    const details = useRef<null | HTMLInputElement>(null);
    const phone = useRef<null | HTMLInputElement>(null);

    async function checkout() {
        if (!cartId) return;

        setLoading(true);

        const shippingAddress = {
            details: details?.current?.value as string,
            phone: phone?.current?.value as string,
            city: city?.current?.value as string,
        };

        if (method === "credit") {
            const response = await checkoutAction(cartId, shippingAddress);
            if (response?.status == "success") {
                location.href = response.session.url;

            }
        } else {
            const response = await checkoutCashAction(cartId, shippingAddress);
            if (response?.status == "success") {
                router.push("/allorders");
                toast.success(response.status);
            }
        }

        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full rounded-3xl" disabled={cartNumOfItems == 0}>
                    Checkout
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-accent">
                            <MapPin className="h-4 w-4" />
                        </span>
                        Shipping Address
                    </DialogTitle>
                    <DialogDescription>
                        Add your address details to proceed with checkout.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-2 space-y-4">

                    <div className="rounded-2xl border bg-accent p-4">
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="details" className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4" />
                                    Address details
                                </Label>
                                <Input
                                    className="bg-white"
                                    id="details"
                                    name="details"
                                    placeholder="Street, building, apartment..."
                                    ref={details}
                                />
                            </Field>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Field>
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        Phone
                                    </Label>
                                    <Input
                                        className="bg-white"
                                        id="phone"
                                        name="phone"
                                        placeholder="01xxxxxxxxx"
                                        inputMode="tel"
                                        ref={phone}
                                    />
                                </Field>

                                <Field>
                                    <Label htmlFor="city">City</Label>
                                    <Input className="bg-white" id="city" name="city" placeholder="Cairo , Alex..." ref={city} />
                                </Field>
                            </div>
                        </FieldGroup>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        We’ll use this address for delivery and contact.
                    </div>


                    <div className="rounded-2xl border p-4 space-y-3">
                        <Label>Payment Method</Label>
                        <RadioGroup
                            value={method}
                            onValueChange={(v) => setMethod(v as "credit" | "cash")}
                            className="flex gap-4 mt-3"
                        >
                            <div className="flex items-center gap-x-2">
                                <RadioGroupItem value="credit" id="credit" />
                                <Label htmlFor="credit">Credit Card</Label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash">Cash</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <DialogFooter className="mt-4 gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-3xl">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        onClick={checkout}
                        disabled={loading}
                        className="rounded-3xl"
                    >
                        {loading && <Loader2 className="animate-spin mr-2" />}
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}