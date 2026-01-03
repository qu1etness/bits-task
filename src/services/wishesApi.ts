import type {IWish} from "@/interfaces/wish-interface.ts";

const API_BASE = import.meta.env.VITE_API_URL;

async function handleRes(res: Response) {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
    }
    return res.json();
}

export const wishesApi = {
    list: async (query?: Record<string, any>) => {
        const params = new URLSearchParams();
        if (query) {
            Object.entries(query).forEach(([k, v]) => {
                if (v !== undefined && v !== null) params.append(k, String(v));
            });
        }
        const res = await fetch(API_BASE + (params.toString() ? `?${params}` : ""));
        return handleRes(res) as Promise<IWish[]>;
    },
    get: async (id: number) => {
        const res = await fetch(`${API_BASE}/${id}`);
        return handleRes(res) as Promise<IWish>;
    },
    create: async (payload: IWish) => {
        const res = await fetch(API_BASE, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });
        return handleRes(res) as Promise<IWish>;
    },
    update: async (id: number, payload: Partial<IWish>) => {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });
        return handleRes(res) as Promise<IWish>;
    },
    remove: async (id: number) => {
        const res = await fetch(`${API_BASE}/${id}`, {method: "DELETE"});
        if (!res.ok) throw new Error(res.statusText);
        return true;
    },
};

