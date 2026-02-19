import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Heart, ShoppingBagIcon, User } from "lucide-react";
import { SidebarTrigger } from "../../ui/sidebar";
import NavList from "./NavList";
import Logout from "./Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";
import { getCart } from "@/actions/cartActions.action";
import { cartResponse } from "@/interfaces/cartInterfaces";
import ShoppingBag from "./ShoppingBag";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    let data : cartResponse | null = null; 
    if (session){
        data = await getCart();
    }
    

    return (
        <>
            <nav className="bg-background shadow-[0_6px_20px_rgba(0,0,0,0.03)] fixed w-full z-20">
                <div className="container px-6 mx-auto flex justify-between items-center py-4">
                    <div className="nav-logo flex items-center gap-2">
                        <span className="text-2xl font-extrabold rounded-full bg-accent-foreground text-accent px-3 pb-0.5">S</span>
                        <h2 className="font-extrabold">
                            <Link href={"/"} className="text-accent-foreground text-[22px]">Shop Mart</Link>
                        </h2>
                    </div>

                    <div className="nav-list hidden md:block">
                        <NavigationMenu>
                            <NavList />
                        </NavigationMenu>
                    </div>
                    <div className="nav-icons hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger><User /></NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        { session ? <>
                                        <Link href={"/allorders"} className="block px-1 py-2 text-sm hover:bg-accent rounded-md font-semibold text-accent-foreground duration-300">My Orders</Link>
                                        <Logout/>
                                        </> : <>
                                        <Link href={"/login"} className="block px-4 py-2 text-sm hover:bg-accent rounded-md font-semibold text-accent-foreground duration-300">Login</Link>
                                        <Link href={"/register"} className="block px-4 py-2 text-sm hover:bg-accent rounded-md font-semibold text-accent-foreground duration-300">Register</Link>
                                        </>}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <div className="ms-2">
                                    <NavigationMenuItem>
                                        <ul className="flex flex-col gap-1.5">
                                            <li><Link href={"/wish-list"}><Heart className="size-5" /></Link></li>
                                            <ShoppingBag cartCount={data?.numOfCartItems || 0} userId={data?.data?.cartOwner || ""} />
                                        </ul>
                                    </NavigationMenuItem>
                                </div>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex items-center justify-center mt-2 md:hidden">
                        <ul className="flex gap-3">
                            <li><Link href={"/wish-list"}><Heart className="size-7" /></Link></li>
                            <ShoppingBag  cartCount={data?.numOfCartItems || 0} userId={data?.data?.cartOwner || ""} />
                            <li><SidebarTrigger /></li>
                        </ul>      
                    </div>
                </div>
            </nav>
        </>
    )
}
