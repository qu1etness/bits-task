import ActionsBar from "@/components/dashboard/actions-bar.tsx";
import Filters from "@/components/dashboard/filters.tsx";
import WishList from "@/components/dashboard/wish-list.tsx";
import WishesPagination from "@/components/dashboard/wishes-pagination.tsx";
import { useDashboardWishes } from "@/hooks/use-dashboard-wishes";
import { useGetWishes } from "@/hooks/use-get-wishes";

const DashboardPage = () => {

    const { wishes, listStatus } = useGetWishes();

    const {
        pagination,
        setPagination,
        filter,
        setFilter,
        totalPages,
        filteredItems,
    } = useDashboardWishes(wishes);

    return (
        <div className="w-full min-h-screen bg-background">
            <div className="py-7 px-16">
                <ActionsBar totalWishes={wishes.length} />
            </div>
            <div className="w-full h-[1px] bg-border" />
            <div className="my-6 mx-14">
                <Filters value={filter} onChange={setFilter} />
            </div>
            <div className="w-full h-[1px] bg-border" />
            <WishList
                items={filteredItems}
                loading={listStatus === 'loading'}
            />
            <WishesPagination
                page={pagination}
                totalPages={totalPages}
                onChange={setPagination}
            />
        </div>
    );
};

export default DashboardPage;