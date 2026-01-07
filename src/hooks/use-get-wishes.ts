import { useEffect } from "react";
import { useWishesContext } from "@/hooks/use-wishes-contex.ts";
import { toast } from "sonner";

export const useGetWishes = () => {

    const { state: { wishes, listStatus }, getWishes } = useWishesContext();

    useEffect(() => {
        getWishes().catch(e => {
            toast.error(e.message || "Failed to fetch wishes");
        });
    }, [getWishes]);

    return {
        wishes,
        listStatus,
    };
};
