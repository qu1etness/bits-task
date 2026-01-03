import WishCard from "./wish-card.tsx";
import type { IWish } from "@/interfaces/wish-interface.ts";

const WishList = ({ items, loading }: {
    items: IWish[];
    loading: boolean;
}) => {
    if (loading) return <div>Loading...</div>;
    if (items.length === 0) return <div>No wishes yet</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-10 mb-20">
            {items.map((w) => (
                <WishCard key={w.id} wish={w} />
            ))}
        </div>
    );
};

export default WishList;

