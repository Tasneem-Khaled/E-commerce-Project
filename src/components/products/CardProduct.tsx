import { formatPrice } from "@/app/(routes)/(public)/products/page";
import Rating from "@/components/products/Rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { product } from "@/interfaces/productsInterfaces";
import { Heart, ShoppingCartIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./addToCartBtn";
import WishlistHeart from "./WishList";

export default function CardProduct({ product ,initiallyInWishlist }: { product: product , initiallyInWishlist?:boolean }) {
    return (
        <>
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.06)] pt-0">
                <Link href={'/products/' + product.id}>
                    <div className="card-image">
                        <Image src={product.imageCover} className="w-full rounded-t-xl" alt={product.title} width={300} height={400}></Image>
                    </div>
                    <CardHeader>
                        <CardDescription className="font-semibold mt-3.5">{product.brand.name}</CardDescription>
                        <CardTitle>{product.category.name}</CardTitle>
                        <CardDescription className="font-normal truncate">{product.title}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Rating rating={product.ratingsAverage} reviews={product.ratingsQuantity} />
                        <p className="text-lg font-semibold"> {formatPrice(product.price)}</p>
                    </CardContent>
                </Link>

                <CardFooter>
                    <AddToCartBtn productId={product.id} />
                    <WishlistHeart productId={product._id} initiallyInWishlist={initiallyInWishlist} />
                </CardFooter>
            </Card>
        </>
    )
}
