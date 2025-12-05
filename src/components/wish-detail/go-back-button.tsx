"use client"
import {useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft} from "lucide-react";

const GoBackButton = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="py-6 px-14">
            <Button onClick={handleGoBack} variant={"outline"}><ArrowLeft/></Button>
        </div>
    );
};

export default GoBackButton;