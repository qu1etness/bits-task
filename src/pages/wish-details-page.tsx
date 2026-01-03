import GoBackButton from "@/components/wish-detail/go-back-button.tsx";
import { useParams } from "react-router";
import { toast } from "sonner";
import ManageWish from "@/components/wish-detail/manage-wish.tsx";
import { useCallback, useEffect } from "react";
import { useWishesContext } from "@/hooks/use-wishes-contex.ts";

const WishDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const { state: { currentWish: data, currentStatus }, getWish } = useWishesContext()

    const handleRevalidation = useCallback(async () => {
        if (id !== undefined) {
            await getWish(id);
        }
    }, [id, getWish]);

    useEffect(() => {
        handleRevalidation()
    }, [handleRevalidation]);

    if (currentStatus === 'loading') {
        return <p>Завантаження даних...</p>;
    }

    if (currentStatus === 'error') {
        toast.error("Помилка завантаження даних бажання.");
        return <p className="text-red-500">Виникла помилка.</p>;
    }

    if (!data) {
        toast.error("Бажання не знайдено (404).");
        return <p>Дані не доступні.</p>;
    }

    const { description, price, title, imagePath } = data || {};

    return (
        <div className="w-full min-h-screen bg-background">
            <GoBackButton />
            <div className="w-full h-[1px] bg-border" />
            <ManageWish wish={data} onRevalidate={handleRevalidation} />
            <div className="w-full h-[1px] bg-border" />

            <div className={"flex justify-center w-full mt-10"}>
                <div className={"flex w-3/4 gap-10 p-6 bg-card rounded-xl shadow-lg  flex-col md:flex-row"}>

                    <div className={"aspect-square max-h-80 sm:h-110  rounded-lg overflow-hidden border"}>
                        {imagePath ? (
                            <img
                                src={imagePath}
                                alt={title}
                                className="w-full h-full object-cover aspect-square"
                            />
                        ) : (
                            <div
                                className="w-full aspect-square h-full flex items-center justify-center bg-gray-200 text-gray-500">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className={'flex-1 flex flex-col justify-between'}>
                        <div>
                            <p className="text-4xl font-bold mb-4">{title}</p>
                            <p className="text-2xl text-primary font-semibold mb-6">
                                Ціна: ${price ? price.toFixed(2) : 'N/A'}
                            </p>
                            <h3 className="text-xl font-medium mb-2">Опис:</h3>
                            <p className={"text-muted-foreground"}>
                                {description}
                            </p>
                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            Створено: {new Date(data?.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WishDetailsPage;