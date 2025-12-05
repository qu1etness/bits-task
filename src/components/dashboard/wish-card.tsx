import { Link } from "react-router";
import {Button} from "@/components/ui/button.tsx";
import type {IWish} from "@/interfaces/wish-interface.ts";

const WishCard = ({ wish } : { wish: IWish }) => {

    return (
        <div className="rounded-lg shadow p-4 bg-card flex flex-col justify-end">
            <div className="mb-3 flex items-center justify-center overflow-hidden flex-1 aspect-square ">
                {wish?.imagePath ?
                    <img src={wish.imagePath} alt={wish?.title} className="object-cover h-full w-full rounded-2xl"/> :
                    <div className="text-gray-400">No image</div>}
            </div>
            <div>
                <div className={"flex justify-between"}>
                    <span className="font-semibold mb-1">{wish?.title}</span>
                    <span className="text-lg font-bold">${wish?.price}</span>
                </div>
                <p className="text-sm min-h-10 text-gray-600 mb-2">{wish.description}</p>
                <div className=" flex items-center justify-between">
                    <Link className={"w-full"} to={'/wishes/' + wish.id}>
                        <Button className="text-sm w-full">View Details</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WishCard;
