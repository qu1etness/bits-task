import type { IWish } from "@/interfaces/wish-interface";

const API_BASE  = import.meta.env.VITE_API_URL as string || "http://localhost:3000/wishes";

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
    }
    return await res.json() as T;
}

export const wishesApi = {
    list: async (): Promise<IWish[]> => {
        const url = `${API_BASE}`;
        const res = await fetch(url);
        return handleResponse<IWish[]>(res);
    },

    get: async (id: string): Promise<IWish> => {
        const url = `${API_BASE}/${id}`;
        const res = await fetch(url);
        return handleResponse<IWish>(res);
        console.log("Fetched wish:", res);
    },

    create: async (payload: Omit<IWish, 'id'>): Promise<IWish> => {
        const url = `${API_BASE}`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        return handleResponse<IWish>(res);
    },

    update: async (id: number, payload: Partial<IWish>): Promise<IWish> => {
        const url = `${API_BASE}/${id}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        return handleResponse<IWish>(res);
    },

    remove: async (id: number): Promise<boolean> => {
        const url = `${API_BASE}/${id}`;
        const res = await fetch(url, {
            method: "DELETE",
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || res.statusText);
        }
        return true;
    },
};