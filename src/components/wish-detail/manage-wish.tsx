import EditWishDialog from "./edit-wish-dialog";
import DeleteWishButton from "./delete-wish-button";
import { useWishesContext } from "@/hooks/use-wishes-contex";


const ManageWish = () => {

    const { state: { currentWish: wish } } = useWishesContext()

    const { title, id } = wish || {};

    return (

        <div className="my-6 mx-14 flex justify-between items-center gap-6">
            <h2 className={"sm:text-3xl text-xl "}>Wish Details: {title}</h2>

            <div className="sm:flex gap-4">
                <EditWishDialog wish={wish} />
                <DeleteWishButton wishTitle={title} wishId={id} />
            </div>
        </div>
    );
};

export default ManageWish;