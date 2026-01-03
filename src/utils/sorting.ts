import type { IWish } from "@/interfaces/wish-interface";

// To add new sort strategy, just  add it to sortOptions

const sortOptions: Record<string, Record<string, (a: IWish, b: IWish) => number>> = {
    price: {
        "to-low": (a: IWish, b: IWish) => b.price - a.price,
        "to-high": (a, b) => a.price - b.price,
    },
    date: {
        "newest": (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        "oldest": (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
}


const makeSortStrategy = () => {
    let index = 0

    const sortStrategy: Record<string, (a: IWish, b: IWish) => number> = {}
    const filterItems: { name: string, options: string[] }[] = []


    for (const key in sortOptions) {

        filterItems.push({
            name: key,
            options: []
        })

        for (const option in sortOptions[key]) {
            sortStrategy[option] = sortOptions[key][option];
            filterItems[index].options.push(option)
        }
        index++
    }

    return { sortStrategy, filterItems };
}

export const { sortStrategy: sortStrategies, filterItems } = makeSortStrategy();