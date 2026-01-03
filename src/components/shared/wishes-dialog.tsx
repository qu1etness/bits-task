import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import { DialogClose } from "@radix-ui/react-dialog";
import { type FormEvent, type FormEventHandler, useState } from "react";
import WishesInput from './wishes-input';

interface IProps {
    title: string
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const WishesDialog = ({ title, onSubmit }: IProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        onSubmit(e)
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer px-3 py-1">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <WishesInput name="name" placeholder="Laptop" />
                        <WishesInput name="description" placeholder="A lightweight laptop..." />
                        <WishesInput name="path" placeholder="https://image_path" />
                        <WishesInput name="price" placeholder="$10 000" />
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
    );
};

export default WishesDialog;

