import {useContext} from "react";
import {WishesContext} from "@/context/wishes-contex.tsx";

export const useWishesContext = () => {
    const context = useContext(WishesContext);
    if (context === undefined) {
        throw new Error('useWishesContext must be used with a WishesProvider');
    }
    return context;
};