import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(client)/_components/ui/select";

const Filters = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-8">
        <Select>
          <SelectTrigger className="w-[120px] rounded-full font-semibold bg-slate-200">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobiles">Mobiles</SelectItem>
            <SelectItem value="headphones">Headphones</SelectItem>
            <SelectItem value="laptops">Laptops</SelectItem>
            <SelectItem value="watches">Watches</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[120px] rounded-full font-semibold bg-slate-200">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[120px] rounded-full font-semibold bg-slate-200">
            <SelectValue placeholder="Offers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30%">Min. 30% discount</SelectItem>
            <SelectItem value="60%">Min. 60% discount</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[120px] rounded-full font-semibold">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Price - Low to High</SelectItem>
            <SelectItem value="dark">Price - High to Low</SelectItem>
            <SelectItem value="system">Rating - High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filters;
