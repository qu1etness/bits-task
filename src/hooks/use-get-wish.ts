import { useCallback, useEffect } from "react";
import { useWishesContext } from "./use-wishes-contex";
import { toast } from "sonner";


export const useGetWish = (id: string) => {

    const { state: { currentWish: data, currentStatus }, getWish } = useWishesContext()

    const handleRevalidation = useCallback(async () => {
        if (id !== undefined) {
            try {
                await getWish(id);
            } catch (e) {
                toast.error(e instanceof Error ? e.message : "Failed to fetch wish");
            }
        }
    }, [id, getWish]);

    useEffect(() => {
        handleRevalidation()
    }, [handleRevalidation]);

    return { data, currentStatus }
}