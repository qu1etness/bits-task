import ActionsBar from "@/components/dashboard/actions-bar.tsx";
import Filters from "@/components/dashboard/filters.tsx";
import WishList from "@/components/dashboard/wish-list.tsx";
import {useEffect, useMemo, useState} from "react";
import WishesPagination from "@/components/dashboard/wishes-pagination.tsx";
import {useWishesContext} from "@/hooks/use-wishes-contex.ts";

const DashboardPage = () => {
    const [pagination, setPagination] = useState(0)
    const [filter, setFilter] = useState({ orderBy: "to-low"});

    const { state: { wishes, listStatus }, getWishes } = useWishesContext()

    const totalPages = Math.floor(wishes.length / 10);


    useEffect(() => {
        getWishes()
    }, []);

    const filtered = useMemo(() => {
        let arr = [...wishes];

        arr.sort((a, b) => {
            switch (filter.orderBy) {

                case "to-low":
                    return b.price - a.price;
                case "to-high":
                    return a.price - b.price
                case "newest":
                case "oldest": {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    const ta = dateA.getTime();
                    const tb = dateB.getTime();

                    if (isNaN(ta) && isNaN(tb)) return 0;
                    if (isNaN(ta)) return 1;
                    if (isNaN(tb)) return -1;

                    return filter.orderBy === "newest" ? tb - ta : ta - tb;
                }
                default:
                    return b.price - a.price;
            }
        });

        return arr.slice(pagination * 10, (pagination + 1) * 10);
    }, [wishes, filter.orderBy, pagination]);

    return (
        <div className="w-full min-h-screen bg-background">
            <div className="py-7 px-16">
                <ActionsBar
                    total={wishes.length}
                />
            </div>
            <div className="w-full h-[1px] bg-border"/>
            <div className="my-6 mx-14">
                <Filters value={filter} onChange={setFilter}/>
            </div>
            <div className="w-full h-[1px] bg-border"/>
            <WishList
                items={filtered}
                loading={listStatus === 'loading'}
            />
            <WishesPagination page={pagination} totalPages={totalPages} onChange={setPagination}/>
        </div>
    );
};

export default DashboardPage;