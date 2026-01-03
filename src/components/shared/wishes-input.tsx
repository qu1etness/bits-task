import { Input } from "@/components/ui/input.tsx";
import { useId, type ComponentProps } from "react";

interface IProps extends ComponentProps<"input"> {
    name: string
    placeholder: string
}

const WishesInput = ({ name, placeholder, ...props }: IProps) => {

    const uniqeId = useId()

    return (
        <div className="grid gap-3">
            <label htmlFor={uniqeId}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <Input id={uniqeId} name={name} placeholder={placeholder} {...props} />
        </div>
    )
}

export default WishesInput
