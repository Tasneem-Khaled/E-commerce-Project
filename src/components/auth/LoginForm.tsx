"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { emailSchema, PasswordSchema } from "@/helpers/zodSchema"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import ForgotPasswordDialog from "./ForgetPassword"

const formSchema = z.object({
    email: emailSchema.nonempty("Email is required"),
    password: PasswordSchema.nonempty("Password is required")
});

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/products";

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
         try {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: callbackUrl,
            redirect: true
        })
            toast.success("Logged in successfully!")
            router.push(callbackUrl)
        } catch (error) {
            toast.error("Login failed. Please try again.")
        }
        setIsLoading(false);
    }
    return (
        <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Welcome Back !</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Button variant="link" onClick={() => router.push("/register")}>Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <FieldGroup>
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="email">
                                                E-mail
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                type="email"
                                                id="email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="example@example.com"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError className="text-sm text-red-600 mt-1" errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                                            <div className="flex items-center">
                                                <FieldLabel htmlFor="password">
                                                    Password
                                                </FieldLabel>
                                                <ForgotPasswordDialog/>
                                            </div>
                                            <Input
                                                {...field}
                                                type="password"
                                                id="password"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter your password..."
                                            />
                                            {fieldState.invalid && (
                                                <FieldError className="text-sm text-red-600 mt-1" errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="gap-2">
                <Field orientation="horizontal">
                    <Button  form="login-form" type="submit" className="grow rounded-3xl" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <Button type="button" className="rounded-3xl" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                </Field>
            </CardFooter>
        </Card>

    )
}
