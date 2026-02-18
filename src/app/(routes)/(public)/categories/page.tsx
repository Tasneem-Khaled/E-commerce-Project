import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoriesResponse, Category } from '@/interfaces/categoriesInterfaces';
import Image from 'next/image';
import Link from 'next/link';

export default async function page() {
  const response = await fetch(process.env.API_URL + 'categories');
  const { data: categories }: CategoriesResponse = await response.json();
  return (
    <>
      <div className="bg-background container mx-auto px-6 pt-23 md:pt-29 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category: Category) =>
            <div key={category._id} className="">
              <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.06)] pt-0">
                <Link href={'/categories/' + category._id}>
                  <div className="card-image">
                    <Image src={category.image} className="w-full h-100 object-cover rounded-t-xl" alt={category.name} width={300} height={400}></Image>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-bold text-accent-foreground text-xl text-center mt-3.5">{category.name}</CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
