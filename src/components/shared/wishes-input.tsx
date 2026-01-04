import { Input } from "@/components/ui/input.tsx";
import { useId, type ComponentProps } from "react";


const WishesInput = ({ name, placeholder, ...props }: ComponentProps<"input">) => {

    const uniqeId = useId()

    return (
        <div className="grid gap-3">
            <label htmlFor={uniqeId}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <Input id={uniqeId} name={name} placeholder={placeholder} {...props} />
        </div>
    )
}

export default WishesInput
