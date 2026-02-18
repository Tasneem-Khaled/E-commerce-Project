
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                const response = await fetch(process.env.API_URL + "auth/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    return {
                        id: data.user.email,
                        apiUser: data.user,
                        apiToken: data.token
                    };
                } else {
                    throw new Error(data.message || "Login failed");
                }

            }
        })

    ],
    pages: {
        signIn: "/login",
        error: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token , user }) {
            if (user) {
                token.apiUser = user.apiUser;
                token.apiToken = user.apiToken;
            }
            return token;
        }
        ,
        async session({ session, token }) {
            session.user = token.apiUser;
            session.accessToken = token.apiToken;
            return session;
        }

    }

};