"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
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

import { emailSchema, nameSchema, PasswordSchema, phoneSchema } from "@/helpers/zodSchema"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SignUp } from "@/actions/regAuth.action"

const formSchema = z
    .object({
        name: nameSchema,
        email: emailSchema,
        password: PasswordSchema,
        rePassword: z.string().min(1, "Confirm password is required"),
        phone: phoneSchema
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    });

export type RegisterFormSchema = z.infer<typeof formSchema>;

export function RegisterForm() {
    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
    })

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const result = await SignUp(data);
            toast.success("Registered successfully!")
            router.push("/login")
    
        } catch (error) {
            toast.error("An error occurred during registration");
        }
        setIsLoading(false);
    }

    const registerFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Enter your full name" },
        { name: "email", label: "E-mail", type: "email", placeholder: "name@example.com" },
        { name: "password", label: "Password", type: "password", placeholder: "Create a strong password" },
        { name: "rePassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password" },
        { name: "phone", label: "Phone", type: "text", placeholder: "e.g. 01xxxxxxxxx" },
    ];
    return (
        <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Register now and Join US !</CardTitle>
                <CardDescription>
                    Enter your details below to register for an account
                </CardDescription>
                <CardAction>
                    <Button variant="link" onClick={() => router.push("/login")}>Login</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <FieldGroup>
                                {registerFields.map((input, index) => (
                                    <Controller
                                        key={index}
                                        name={input.name as keyof RegisterFormSchema}
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={input.name}>
                                                    {input.label}
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    type={input.type}
                                                    id={input.name}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder={input.placeholder}
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError className="text-sm text-red-600 mt-1" errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                ))}
                            </FieldGroup>

                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="gap-2">
                <Field orientation="horizontal">
                    <Button form="register-form" type="submit" className="grow rounded-3xl" disabled={isLoading}>
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </Button>
                    <Button type="button" className="rounded-3xl" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                </Field>
            </CardFooter>
        </Card>

    )
}
