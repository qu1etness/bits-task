
import { type FormEvent } from "react";
import { useWishesContext } from "@/hooks/use-wishes-contex.ts";
import WishesDialog from "../shared/wishes-dialog";
import { Plus } from "lucide-react";

const CreateWishDialog = () => {

    const { createWish } = useWishesContext()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);

        const title = formData.get('name') as string;
        const description = formData.get('description') as string;
        const imagePath = formData.get('path') as string;
        const price = parseFloat(formData.get('price') as string);
        const createdAt = new Date().toISOString()

        createWish({ title, description, imagePath, price, createdAt });
    }

    return (
        <WishesDialog title="Add new wish" onSubmit={handleSubmit} >
            <Plus />
        </WishesDialog>
    );
};

export default CreateWishDialog;

