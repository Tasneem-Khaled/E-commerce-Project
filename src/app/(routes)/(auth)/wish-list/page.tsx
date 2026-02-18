import { getWishlist } from '@/actions/wishListActions.action';
import CardProduct from '@/components/products/CardProduct';

export default async function page() {
  const wishlistData = await getWishlist();
  const products = wishlistData.data

  return (
      <div className="bg-background container mx-auto px-6 pt-23 md:pt-29 pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.map((product) =>
                  <div key={product._id} className="">
                    <CardProduct product={product} initiallyInWishlist={true} />
                  </div>
                )}
              </div>
            </div>
  )
}
