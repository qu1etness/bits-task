import { useWishesContext } from "@/hooks/use-wishes-contex";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import type { ComponentProps } from "react";

import { toast } from "sonner";

interface DeleteWishButtonProps extends ComponentProps<'button'> {
    wishTitle: string;
    wishId: number;
}

const DeleteWishButton = ({ wishTitle, wishId, ...props }: DeleteWishButtonProps) => {

    const navigate = useNavigate();

    const { deleteWish } = useWishesContext()

    const handleDelete = async () => {
        if (!window.confirm(`Ви впевнені, що хочете ви далити "${wishTitle}"?`)) {
            return;
        }
        try {
            await deleteWish(String(wishId));
            toast.success("Wish deleted successfully");
            navigate("/dashboard");
        } catch (e) {
            console.error("Delete failed:", e);
            toast.error("Failed to delete wish");
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
