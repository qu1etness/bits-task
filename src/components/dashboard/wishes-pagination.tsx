import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

const WishesPagination = ({ page = 0, totalPages, onChange }: {
    page: number;
    totalPages?: number;
    onChange?: (setter: (prevState: number) => number) => void;
} ) => {

    const handleRaisePage = () => {
        if (onChange) {
            onChange(prevValue => prevValue + 1);
        }
    }

    const handleLowerPage = () => {
        if (onChange) {
            onChange(prevValue => prevValue - 1);
        }
    }

    return (
        <Pagination className="my-20">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious isActive={page < 1} onClick={handleLowerPage}/>
                </PaginationItem>
                <PaginationItem>
                    {page + 1}
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext isActive={page === totalPages} onClick={handleRaisePage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default WishesPagination;