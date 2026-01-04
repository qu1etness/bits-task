import { useWishesContext } from "@/hooks/use-wishes-contex";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import type { ComponentProps } from "react";


const DeleteWishButton = ({ ...props }: ComponentProps<'button'>) => {

    const navigate = useNavigate();

    const { deleteWish, state: { currentWish: wish } } = useWishesContext()

    const handleDelete = async () => {
        if (!window.confirm(`Ви впевнені, що хочете ви далити "${wish?.title}"?`)) {
            return;
        }
        try {
            await deleteWish(wish.id);
            navigate("/dashboard");
        } catch (e) {
            console.error("Delete failed:", e);
        }
    }

    return (
        <Button
            variant="destructive"
            onClick={handleDelete}
            {...props}
            className="flex items-center flex-1 w-full"
        >
            <span>Delete</span>
        </Button>
    );
};

export default DeleteWishButton
