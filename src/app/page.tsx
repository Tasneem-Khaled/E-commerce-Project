import { Button } from "@/components/ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-25 md:py-31 px-16 bg-white dark:bg-black sm:items-start">
        <div className="nav-logo flex items-center gap-2">
          <span className="text-3xl font-extrabold rounded-full bg-accent-foreground text-accent px-3 pb-0.5">S</span>
          <h2 className="font-extrabold">
            <Link href={"/"} className="text-accent-foreground text-3xl">Shop Mart</Link>
          </h2>
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs mt-6 text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to ShopMart
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Discover the latest technology, fashion, and lifestyle products.{" "}
            <a
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Quality guaranteed
            </a>{" "}
            with fast shipping and{" "}
            <a
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              excellent customer service.
            </a>{" "}
            Shop now and experience the best online shopping destination !
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-6 md:mt-3 text-base font-medium sm:flex-row">
          <Button className="p-6 rounded-4xl">
            <Link className="font-semibold text-[16px]"
              href={"/products"}
            >
              <ShoppingBasketIcon className="size-6 inline-block mr-2" /> Shop Now
            </Link></Button>
          <Button variant="outline" className="py-6 rounded-4xl">
            <Link className="font-semibold text-[16px]"
              href={"/categories"}
            >
              Browse Categories
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
