import GoBackButton from "@/components/wish-detail/go-back-button.tsx";
import { useParams } from "react-router";
import ManageWish from "@/components/wish-detail/manage-wish.tsx";
import { useGetWish } from "@/hooks/use-get-wish.ts";
import WishDetailCard from "@/components/wish-detail/wish-detail-card";

const WishDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data, currentStatus } = useGetWish(id);

    if (currentStatus === 'loading') {
        return <p>Завантаження даних...</p>;
    }

    const { description, price, title, imagePath, createdAt } = data || {};

    return (
        <div className="w-full min-h-screen bg-background">
            <GoBackButton />
            <div className="w-full h-[1px] bg-border" />
            {data?.title && <ManageWish title={title} />}
            <div className="w-full h-[1px] bg-border" />
            <WishDetailCard title={title} description={description} price={price} imagePath={imagePath} createdAt={createdAt} />
        </div>
    );
};

export default WishDetailsPage;