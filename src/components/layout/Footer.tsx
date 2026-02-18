import { footerData } from '@/helpers/footerData'
import { LocationEditIcon, MailIcon, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className="bg-accent-foreground text-accent py-6">
            <div className="container mx-auto px-6 pt-4">
                <div className="flex flex-col-reverse gap-6 items-center justify-between">
                    <p className="text-sm">&copy; 2026 ShopMart. All rights reserved.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full mt-4 md:mt-0">
                        <div className="content-logo col-span-1 md:col-span-2">
                            <div className="logo flex items-center gap-2">
                            <span className="text-[24px] font-extrabold rounded-full bg-accent text-accent-foreground px-3.5">S</span>
                            <h4 className="font-extrabold">
                                <Link href={"/"} className="text-accent text-xl">Shop Mart</Link>
                            </h4>
                        </div>
                        <p className="text-gray-400 mt-2 px-3"> Discover thousands of products at unbeatable prices, fast delivery, secure payment, and top brands in one place.</p>
                        <ul className="flex flex-col gap-1 text-accent mt-6 px-4">
                            <li><LocationEditIcon className="size-4 me-3 inline"/>123 Shop Street, Octoper City, DC 12345</li>
                            <li><Phone className="size-4 me-3 inline"/>(+20) 01093333333</li>
                            <li><MailIcon className="size-4 me-3 inline"/>contact@shopmart.com</li>
                        </ul>
                        </div>
                        {
                            footerData.map((item, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <ul className="flex flex-col gap-1 px-3">
                                        {item.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link href="#" className="text-gray-400 hover:text-accent">{link}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
