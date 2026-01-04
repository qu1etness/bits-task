"use client"
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps } from "react";


const GoBackButton = ({ ...props }: ComponentProps<'button'>) => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="py-6 px-14">
            <Button onClick={handleGoBack} variant={"outline"} {...props}>
                <ArrowLeft />
            </Button>
        </div>
    );
};

export default GoBackButton;