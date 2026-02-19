import CardProduct from '@/components/products/CardProduct';
import { product, productsData } from '@/interfaces/productsInterfaces';

export default async function CategoryDeatails({ params }: { params: { brandId: string } }) {
  const { brandId } = await params;
  const response = await fetch(process.env.API_URL + 'products?brand=' + brandId);
  const { data: products }: productsData = await response.json();
  return (
    <>
      <div className="bg-background container mx-auto px-6 pt-23 md:pt-25 pb-10 relative min-h-screen">
        <h4 className="text-3xl text-accent-foreground font-bold mb-2">{products[0]?.brand?.name}</h4>
        {products.length > 0 && (<p className="text-muted-foreground mb-4.5">Explore our products from {products[0]?.brand?.name}. Find the perfect match for your style and needs!</p>)}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product: product) =>
              <div key={product._id}>
                <CardProduct product={product} />
              </div>
            )}
          </div>
        ) : (<h4 className="text-2xl text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-center">No products found from this brand.</h4>)}
      </div>
    </>
  )
}
