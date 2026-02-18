import { product } from "@/interfaces/productsInterfaces";
import { Params } from "next/dist/server/request/params";

import ProductDeatails from "@/components/products/ProductDeatails";


export default async function productDeatailsPage({ params }: { params: Params }) {
    const { productId } = await params;
    const response = await fetch(process.env.API_URL + 'products/' + productId);
    const { data: product }: { data: product } = await response.json();
    return (
        <div className="bg-background container mx-auto px-6 pt-23 md:pt-29 pb-5">
            <ProductDeatails product={product} />
        </div>
    )
}