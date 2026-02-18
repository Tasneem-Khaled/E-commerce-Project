"use server"
import { RegisterFormSchema } from "@/components/auth/RegisterForm";


export async function SignUp(data: RegisterFormSchema) {

    const response = await fetch(process.env.API_URL + "auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name,
            phone: data.phone,
            rePassword : data.rePassword
        })
    });

    const responseData = await response.json();

    if (response.ok) {
        return responseData;
    } else {
        throw new Error(responseData.message || "Registration failed");
    }

}