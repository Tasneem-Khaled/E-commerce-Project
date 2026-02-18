import { Star } from 'lucide-react'

export default function Rating({ rating , reviews }: { rating: number, reviews: number }) {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(<Star key={i} fill="true" className="fill-yellow-500 text-yellow-500" />);
    }
    if(rating == 0 && reviews == 0){
        stars.push(<span key={0} className="text-accent-foreground font-semibold">No ratings yet</span>);
    }
    return (
        <div className="flex gap-1 mt-2.5 mb-1.5">
            {stars}
            {reviews > 0 && <span className="font-semibold ms-1">{reviews} reviews</span>}
        </div>
    )
}
