import { Link } from "react-router";
import { Button } from "../ui/button";

interface IProps {
    title: string;
    price: number;
    description: string;
    id: string;
}

const WishCardDetails = ({ title, price, description, id }: IProps) => {
    return (
        <div>
            <div className={"flex justify-between"}>
                <span className="font-semibold mb-1">{title}</span>
                <span className="text-lg font-bold">${price}</span>
            </div>
            <p className="text-sm min-h-10 text-gray-600 mb-2">{description}</p>
            <div className=" flex items-center justify-between">
                <Link className={"w-full"} to={'/wishes/' + id}>
                    <Button className="text-sm w-full">View Details</Button>
                </Link>
            </div>
        </div>
    );
};

export default WishCardDetails;