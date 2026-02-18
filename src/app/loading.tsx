import Link from "next/link";


export default function loading() {
    return (
        <>
            <div className="flex flex-col gap-7 items-center justify-center h-screen">
                <div className="nav-logo flex items-center gap-2">
                    <span className="text-4xl font-extrabold rounded-full bg-accent-foreground text-accent px-3 pb-0.5">S</span>
                    <h2 className="font-extrabold">
                        <Link href={"/"} className="text-accent-foreground text-4xl">Shop Mart</Link>
                    </h2>
                </div>
                <div className="spinner">
                    <div className="w-15 h-15 rounded-full border-5 border-l-accent-foreground border-muted-foreground/20 animate-spin flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border-5 border-r-muted-foreground border-muted-foreground/20"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
