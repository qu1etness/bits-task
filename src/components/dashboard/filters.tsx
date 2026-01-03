import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { filterItems } from "@/utils/sorting";

const Filters = ({ value, onChange }: { value: { orderBy: string }; onChange: (v: { orderBy: string }) => void }) => {

    const handleDateChange = (val: string) => {
        onChange({ orderBy: val })
    }

    return (
        <div className="flex gap-6 items-center sm:flex-row flex-col">
            <div>
                <Select value={value.orderBy} onValueChange={handleDateChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by date" />
                    </SelectTrigger>
                    <SelectContent>
                        {filterItems.map(value => (
                            <SelectGroup key={value.name}>
                                <SelectLabel>{value.name}</SelectLabel>
                                {value.options.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectGroup>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default Filters;

