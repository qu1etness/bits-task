import type { IWish } from "@/interfaces/wish-interface";
import WishImg from "../shared/wish-img";

const WishDetailCard = ({ title, description, price, imagePath, createdAt }: Partial<Omit<IWish, 'id'>>) => {

    return (
        <div className={"flex justify-center w-full mt-10"}>
            <div className={"flex w-3/4 gap-10 p-6 bg-card rounded-xl shadow-lg  flex-col md:flex-row"}>

                <div className={"aspect-square max-h-80 sm:h-110  rounded-lg overflow-hidden border"}>
                    <WishImg src={imagePath} alt={title} />
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
                        Створено: {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default WishDetailCard;