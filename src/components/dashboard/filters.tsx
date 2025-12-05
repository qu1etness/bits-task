import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const Filters = ({ value, onChange }: { value: any; onChange: (v: any) => void }) => {

    const handleDateChange = (val: string) => {
        onChange({ orderBy: val })
    }

    return (
        <div className="flex gap-6 items-center sm:flex-row flex-col">
            <div>
                <Select value={value.orderBy} onValueChange={handleDateChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by date"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Date</SelectLabel>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Price</SelectLabel>
                            <SelectItem value="to-low">High to Low</SelectItem>
                            <SelectItem value="to-high">Low to High</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default Filters;

