import { useEffect } from "react";
import { useWishesContext } from "@/hooks/use-wishes-contex.ts";

export const useGetWishes = () => {

    const { state: { wishes, listStatus }, getWishes } = useWishesContext();

    useEffect(() => {
        getWishes();
    }, [getWishes]);

    return {
        wishes,
        listStatus,
    };
};
