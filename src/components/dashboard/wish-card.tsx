import type { IWish } from "@/interfaces/wish-interface.ts";
import WishImg from "../shared/wish-img.tsx";
import WishCardDetails from "./wish-card-details.tsx";

interface IProps {
    wish: IWish;
}

const WishCard = ({ wish }: IProps) => {

    const { id, title, price, description, imagePath } = wish

    return (
        <div className="rounded-lg shadow p-4 bg-card flex flex-col justify-end">
            <div className="mb-3 flex items-center justify-center overflow-hidden flex-1 aspect-square ">
                <WishImg src={imagePath} alt={title} />
            </div>
            <WishCardDetails title={title} price={price} description={description} id={id} />
        </div>
    );
};

export default WishCard;
