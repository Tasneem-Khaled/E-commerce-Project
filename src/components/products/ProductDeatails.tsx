"use client"
import Rating from "@/components/products/Rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { product } from "@/interfaces/productsInterfaces";
import { Heart, ShoppingCartIcon, Star } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { formatPrice } from "@/app/(routes)/(public)/products/page";
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import AddToCartBtn from "./addToCartBtn";

export default function ProductDeatails({ product }: { product: product }) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                    ]}
                    className="mx-auto rounded-lg">
                    <CarouselContent className="-ml-1">
                        {product.images.map((image, index) => (
                            <CarouselItem key={index} className="w-full md:basis-4/5">
                                <Image src={image} alt={product.title} className="w-full max-h-150 object-cover rounded-xl" width={450} height={600} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="product-info">
                    <Card className="gap-2 pt-1.5 shadow-none">
                        <CardHeader className="gap-1">
                            <CardDescription className="font-semibold mt-2 text-[16px] md:text-lg">{product.brand.name}</CardDescription>
                            <CardTitle className="font-bold text-lg md:text-xl">{product.category.name}</CardTitle>
                            <CardDescription className="font-normal text-[16px] md:text-lg">{product.title}</CardDescription>
                        </CardHeader>

                        <CardContent className="gap-5 mb-2 text-[16px]">
                            <Rating rating={product.ratingsAverage} reviews={product.ratingsQuantity} />
                            <p className="font-semibold text-xl mt-3">{formatPrice(product.price)}</p>


                            <div className="flex flex-col gap-4 text-lg mt-4">

                                <div className="flex flex-col gap-1.5">
                                    <div className="text-accent-foreground font-medium text-[16px] md:text-lg mb-3">
                                        <span className="text-red-500 me-1">{product.quantity}</span> in stock hurry up before it is out of stock !
                                    </div>
                                    <Separator />
                                    <div className="leading-none font-medium mt-3">Description</div>
                                    <div className="text-muted-foreground text-[16px]">
                                        {product.description}
                                    </div>

                                </div>

                            </div>
                        </CardContent>

                        <CardFooter className="gap-3 mt-6">
                            <AddToCartBtn productId={product.id} />
                            <Heart className="ms-2" />
                        </CardFooter>

                        <Accordion
                            type="single"
                            collapsible
                            className="px-6 mt-6"
                        >
                            <AccordionItem value="shipping">
                                <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                                <AccordionContent>
                                    We offer standard (5-7 days), express (2-3 days), and overnight
                                    shipping. Free shipping on international orders.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="returns">
                                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                                <AccordionContent>
                                    Returns accepted within 30 days. Items must be unused and in original
                                    packaging. Refunds processed within 5-7 business days.
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>


                    </Card>
                </div>

            </div>
        </div>
    )
}
