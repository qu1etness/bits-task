import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {DialogClose} from "@radix-ui/react-dialog";
import {type FormEvent, useState} from "react";
import type {IWish} from "@/interfaces/wish-interface.ts";
import {useWishesContext} from "@/hooks/use-wishes-contex.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router";

const ManageWish = ({wish, onRevalidate}: {
    wish: IWish
    onRevalidate: () => Promise<void>
}) => {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();


    const {updateWish, deleteWish} = useWishesContext()

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
            await updateWish(wish.id, payload);
            await onRevalidate();
            setIsOpen(false);
        } catch (error) {
            toast.error('Error updating wishes');
        }
    }

    const handleDelete = () => {
        if (!window.confirm(`Ви впевнені, що хочете видалити "${wish?.title}"?`)) {
            return;
        }
        try {
            deleteWish(wish!.id);
            navigate("/");
        } catch (error) {
            toast.error('Error updating wishes');
        }
    }

    const {description, price, title, imagePath} = wish || {};

    return (
        <div className="my-6 mx-14 flex justify-between items-center gap-6">
            <h2 className={"sm:text-3xl text-xl "}>Wish Details: {title}</h2>

            <div className="sm:flex gap-4">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center my-2"
                        >
                            <span>Редагувати</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleEdit}>
                            <DialogHeader>
                                <DialogTitle>Edit Wish: {wish.title}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <label htmlFor="name">Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Laptop"
                                        defaultValue={wish.title}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <label htmlFor="description">Description</label>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="A lightweight laptop..."
                                        defaultValue={description}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <label htmlFor={"path"}>Image path</label>
                                    <Input
                                        id="path"
                                        name="path"
                                        placeholder="https://image_path"
                                        defaultValue={imagePath}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <label htmlFor="price">Price</label>
                                    <Input
                                        id="price"
                                        name="price"
                                        placeholder="$10 000"
                                        type="number"
                                        step="0.01"
                                        defaultValue={price}
                                    />
                                </div>

                            </div>
                            <DialogFooter className={"mt-4"}>
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="flex items-center  flex-1 w-full my-2"
                >
                    <span>Видалити</span>
                </Button>
            </div>
        </div>
    );
};

export default ManageWish;