import { useCallback, useEffect } from "react";
import { useWishesContext } from "./use-wishes-contex";


export const useGetWish = (id: string) => {

    const { state: { currentWish: data, currentStatus }, getWish } = useWishesContext()

    const handleRevalidation = useCallback(async () => {
        if (id !== undefined) {
            await getWish(id);
        }
    }, [id, getWish]);

    useEffect(() => {
        handleRevalidation()
    }, [handleRevalidation]);

    return { data, currentStatus }
}