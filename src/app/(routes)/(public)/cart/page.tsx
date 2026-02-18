import { getCart } from '@/actions/cartActions.action';
import CartUi from '@/components/products/Cart';
import React from 'react'

export default async function page() {
    const cartData = await getCart();
    return (
        <>
            <div className="bg-background container mx-auto px-6 pt-20 pb-10">
                <CartUi cartData={cartData.numOfCartItems == 0 ? null : cartData} />
            </div>
        </>
    )
}
