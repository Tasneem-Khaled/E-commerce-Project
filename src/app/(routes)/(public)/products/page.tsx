import { getWishlist } from "@/actions/wishListActions.action";
import CardProduct from "@/components/products/CardProduct";
import { product, productsData } from "@/interfaces/productsInterfaces";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
  }).format(price);
}

export default async function productsPage() {

  const response = await fetch(process.env.API_URL + 'products');
  const { data: products }: productsData = await response.json();
  const wishlistData = await getWishlist();
    const wishlistProducts = wishlistData.data

  return (
    <>
      <div className="bg-background container mx-auto px-6 pt-23 md:pt-29 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product: product) =>
            <div key={product._id} className="">
              <CardProduct product={product} initiallyInWishlist={wishlistProducts.some((item)=> item.id == product._id)}  />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

