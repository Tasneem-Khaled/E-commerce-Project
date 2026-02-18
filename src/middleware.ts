import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/allorders", "/cart" ,"/wish-list"];
const authRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {

    const token = await getToken({ req })

    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        if (token) { return NextResponse.next(); }
        else {
            const loginUrl = new URL("/login", process.env.BASE_URL);
            loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    if (authRoutes.includes(req.nextUrl.pathname)) {
        if (token) {
            return NextResponse.redirect(new URL("/", process.env.BASE_URL));
        } else {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}