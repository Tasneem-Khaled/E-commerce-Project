import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { authOptions } from '@/helpers/authOptions';
import { HomeIcon, ShoppingBagIcon, UserIcon, ChevronRightIcon, ShoppingBasket, LogOutIcon } from "lucide-react"
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import Logout from './Navbar/Logout';

export async function MySidebar() {
    const session = await getServerSession(authOptions);
    const accountItems = session ? [
        {
            title: "My Orders",
            url: "/allorders",
        },
    ] : [
        {
            title: "Login",
            url: "/login",
        },
        {
            title: "Register",
            url: "/register",
        },
    ];

    const data = {
        navMain: [
            {
                title: "HOME",
                url: "/",
                icon: (
                    <HomeIcon
                    />
                ),
            },
            {
                title: "Products",
                url: "/products",
                icon: (
                    <ShoppingBasket className="size-5" />
                ),
                isActive: true,
                items: [
                    {
                        title: "All Products",
                        url: "/products",
                    },
                    {
                        title: "Categories",
                        url: "/categories",
                    },
                    {
                        title: "Brands",
                        url: "/brands",
                    },
                ],
            },
            {
                title: "Account",
                url: "#",
                icon: (
                    <UserIcon
                    />
                ),
                items: accountItems
            },
        ],

    }

    return (
        <>
            <Sidebar collapsible="offcanvas">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                >
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            isActive={item.isActive}
                                        >
                                            <Link href={item.url}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                        {item.items?.length ? (
                                            <>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                        <ChevronRightIcon
                                                        />
                                                        <span className="sr-only">Toggle</span>
                                                    </SidebarMenuAction>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton asChild>
                                                                    <a href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </a>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </>
                                        ) : null}
                                    </SidebarMenuItem>
                                    </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                    {session &&<div className="flex items-center rounded-lg p-2 hover:bg-accent"><LogOutIcon className="ml-2 size-5"/> <Logout/></div>}
                </SidebarContent>
            </Sidebar>
        </>
    )
}
