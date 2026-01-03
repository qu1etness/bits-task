import { useMemo, useState } from "react";
import type { IWish } from "@/interfaces/wish-interface.ts";
import { sortStrategies } from "@/utils/sorting";


export const useDashboardWishes = (wishes: IWish[]) => {
    const [pagination, setPagination] = useState(0);
    const [filter, setFilter] = useState({ orderBy: "to-low" });

    const totalPages = Math.ceil(wishes.length / 10);

    const filteredItems = useMemo(() => {
        const sorted = [...wishes].sort(sortStrategies[filter.orderBy]);
        const start = pagination * 10;
        return sorted.slice(start, start + 10);
    }, [wishes, filter.orderBy, pagination]);

    return {
        pagination,
        setPagination,
        filter,
        setFilter,
        filteredItems,
        totalPages
    };
};
