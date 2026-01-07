import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import type { IWishState } from './wishes-reducer.ts';
import { initialWishState, wishesReducer } from './wishes-reducer.ts';
import { wishesApi } from '@/api/wishes-api.ts';
import type { IWish } from "@/interfaces/wish-interface.ts";

interface WishesContextType {
    state: IWishState;
    getWishes: () => Promise<void>;
    getWish: (id: string) => Promise<void>;
    createWish: (payload: Omit<IWish, 'id'>) => Promise<void>;
    updateWish: (id: string, payload: Partial<IWish>) => Promise<void>;
    deleteWish: (id: string) => Promise<void>;
}

export const WishesContext = createContext<WishesContextType | undefined>(undefined);

export const WishesProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(wishesReducer, initialWishState);

    const getWish = useCallback(async (id: string) => {
        dispatch({ type: 'GET_WISH_LOADING' });
        try {
            const data = await wishesApi.get(id);
            dispatch({ type: 'GET_WISH_SUCCESS', payload: data });
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to fetch single wish.';
            dispatch({ type: 'GET_WISH_ERROR', payload: errorMessage });
            throw e;
        }
    }, [dispatch]);

    const getWishes = useCallback(async () => {
        dispatch({ type: "GET_WISHES_LOADING" });
        try {
            const data = await wishesApi.list();
            dispatch({ type: "GET_WISHES_SUCCESS", payload: data });
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to fetch wishes.';
            dispatch({ type: "GET_WISHES_ERROR", payload: errorMessage });
            throw e;
        }
    }, [dispatch]);

    const createWish = useCallback(async (payload: Omit<IWish, 'id'>) => {
        dispatch({ type: "CREATE_WISH_LOADING" });
        try {
            const newWish = await wishesApi.create(payload as IWish);
            dispatch({ type: "CREATE_WISH_SUCCESS", payload: newWish });
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to create wish.';
            dispatch({ type: "CREATE_WISH_ERROR", payload: errorMessage });
            throw e;
        }
    }, [dispatch]);


    const updateWish = useCallback(async (id: string, payload: Partial<IWish>) => {
        dispatch({ type: "UPDATE_WISH_LOADING" });
        try {
            const updatedWish = await wishesApi.update(id, payload);
            dispatch({ type: "UPDATE_WISH_SUCCESS", payload: updatedWish });
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to update wish.';
            dispatch({ type: "UPDATE_WISH_ERROR", payload: errorMessage });
            throw e;
        }
    }, [dispatch]);

    const deleteWish = useCallback(async (id: string) => {
        dispatch({ type: "DELETE_WISH_LOADING" });
        try {
            await wishesApi.remove(id);
            dispatch({ type: "DELETE_WISH_SUCCESS", payload: Number(id) });
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to delete wish.';
            dispatch({ type: "DELETE_WISH_ERROR", payload: errorMessage });
            throw e;
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


