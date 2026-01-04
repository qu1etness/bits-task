import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import type { IWishState } from './wishes-reducer.ts';
import { initialWishState, wishesReducer } from './wishes-reducer.ts';
import { wishesApi } from '@/api/wishes-api.ts';
import type { IWish } from "@/interfaces/wish-interface.ts";
import { toast } from "sonner";

interface WishesContextType {
    state: IWishState;
    getWishes: () => Promise<void>;
    getWish: (id: string) => Promise<void>;
    createWish: (payload: Omit<IWish, 'id'>) => Promise<void>;
    updateWish: (id: number, payload: Partial<IWish>) => Promise<void>;
    deleteWish: (id: number) => Promise<void>;
}

export const WishesContext = createContext<WishesContextType | undefined>(undefined);

export const WishesProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(wishesReducer, initialWishState);

    const getWish = useCallback(async (id: string) => {
        dispatch({ type: 'GET_WISH_LOADING' });
        try {
            const data = await wishesApi.get(id);
            dispatch({ type: 'GET_WISH_SUCCESS', payload: data });
            toast.success("Wish fetched successfully.");
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to fetch single wish.';
            dispatch({ type: 'GET_WISH_ERROR', payload: errorMessage });
            toast.error(errorMessage);
        }
    }, [dispatch]);

    const getWishes = useCallback(async () => {
        try {
            const data = await wishesApi.list();
            dispatch({ type: "GET_WISHES_SUCCESS", payload: data });
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to fetch wishes.';
            toast.error(errorMessage);
        }
    }, [dispatch]);

    const createWish = useCallback(async (payload: Omit<IWish, 'id'>) => {
        try {
            const newWish = await wishesApi.create(payload as IWish);
            dispatch({ type: "CREATE_WISH_SUCCESS", payload: newWish });
            toast.success("Wishes created successfully.");
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to create wish.';
            toast.error(errorMessage);
        }
    }, [dispatch]);


    const updateWish = useCallback(async (id: number, payload: Partial<IWish>) => {
        try {
            const updatedWish = await wishesApi.update(id, payload);
            dispatch({ type: "UPDATE_WISH_SUCCESS", payload: updatedWish });
            toast.success("Wishes updated successfully.");
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to update wish.';
            throw new Error(errorMessage);
        }
    }, [dispatch]);

    const deleteWish = useCallback(async (id: number) => {
        return await wishesApi.remove(id);

        try {
            toast.success("Wishes deleted successfully.");
            dispatch({ type: "DELETE_WISH_SUCCESS", payload: id });
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to delete wish.';
            toast.error(errorMessage);
        }

    }, [dispatch]);


    const contextValue = useMemo(() => ({
        state,
        getWishes,
        getWish,
        createWish,
        updateWish,
        deleteWish,
    }), [state, getWishes, getWish, createWish, updateWish, deleteWish]);

    return (
        <WishesContext.Provider value={contextValue}>
            {children}
        </WishesContext.Provider>
    );
};


