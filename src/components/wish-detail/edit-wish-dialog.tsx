import { toast } from "sonner";
import WishesDialog from "../shared/wishes-dialog";
import type { IWish } from "@/interfaces/wish-interface";
import type { FormEvent } from "react";
import { useWishesContext } from "@/hooks/use-wishes-contex";

const EditWishDialog = () => {


    const { updateWish, getWish, state: { currentWish: wish } } = useWishesContext()

    const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Partial<IWish> = {
            title: formData.get('name') as string,
            description: formData.get('description') as string,
            imagePath: formData.get('path') as string,
            price: parseFloat(formData.get('price') as string),
        };

        try {
            await updateWish(wish?.id, payload);
            await getWish(`${wish?.id}`);
        } catch (e) {
            console.error("Update failed:", e);
            toast.error('Error updating wishes');
        }
    }

    return (
        <WishesDialog title={"Edit Wish"} onSubmit={handleEdit} defaultValues={wish} >
            <span>Edit</span>
        </WishesDialog>
    );
};

export default EditWishDialog;