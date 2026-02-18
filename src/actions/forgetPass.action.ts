"use server";

export async function sendResetCodeAction(email: string) {
    const response = await fetch(process.env.API_URL + "auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
        return data
}

export async function verifyResetCodeAction(resetCode: string) {
    const response = await fetch(process.env.API_URL + "auth/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
    });

    const data = await response.json();
    
    
        return data
}

export async function resetPasswordAction(email: string, newPassword: string) {
    const response = await fetch(process.env.API_URL + "auth/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();
    
        return data
}