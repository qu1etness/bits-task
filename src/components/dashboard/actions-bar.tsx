import { Plus } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {DialogClose} from "@radix-ui/react-dialog";
import {Input} from "@/components/ui/input.tsx";
import {type FormEvent, useState} from "react";
import {useWishesContext} from "@/hooks/use-wishes-contex.ts";


const ActionsBar = ({ total } : { total: number}) => {

    const [isOpen, setIsOpen] = useState(false)

    const {createWish} = useWishesContext()

    const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const title = formData.get('name') as string;
        const description = formData.get('description') as string;
        const imagePath = formData.get('path') as string;
        const price = parseFloat(formData.get('price') as string);
        const createdAt = new Date().toISOString()

        createWish({ title, description, imagePath, price, createdAt });

        setIsOpen(false);
    }

    return (
        <div className="flex justify-between items-center">
            <div className="text-secondary-foreground sm:text-3xl">Total wishes - {total}</div>
            <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer px-3 py-1 ">
                            <Plus/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Add new wish</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <label htmlFor="name">Name</label>
                                    <Input id="name" name="name" placeholder="Laptop"/>
                                </div>
                                <div className="grid gap-3">
                                    <label htmlFor="description">Description</label>
                                    <Input id="description" name="description" placeholder="A lightweight laptop..."/>
                                </div>
                                <div className="grid gap-3">
                                    <label htmlFor={"path"}>Image path</label>
                                    <Input id="path" name="path" placeholder="https://image_path"/>
                                </div>
                                <div className="grid gap-3">
                                    <label htmlFor="price">Price</label>
                                    <Input id="price" name="price" placeholder="$10 000"/>
                                </div>
                            </div>
                            <DialogFooter className={"mt-4"}>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ActionsBar;

