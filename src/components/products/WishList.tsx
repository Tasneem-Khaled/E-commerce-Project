"use client";

import addToWishlistAction, {
  removeFromWishlistAction,
} from "@/actions/wishListActions.action";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function WishlistHeart({productId, initiallyInWishlist }: {  productId: string ,initiallyInWishlist?: boolean}) {
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(initiallyInWishlist);
  const [loading, setLoading] = useState(false);

  async function handleToggleWishlist() {
    if (loading) return;
    setLoading(true);

    try {
      if (isInWishlist) {
        const response = await removeFromWishlistAction(productId);

        if (!response) {
          router.push("/login");
          return;
        }

        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        const response = await addToWishlistAction(productId);

        if (!response) {
          router.push("/login");
          return;
        }

        setIsInWishlist(true);
        toast.success(response.message || "Added to wishlist");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Heart
      onClick={handleToggleWishlist}
      className={`cursor-pointer transition ms-1.5 size-6.5 ${
        isInWishlist ? "fill-red-500 text-red-500" : ""
      }`}
    />
  );
}