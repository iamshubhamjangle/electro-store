import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/select";

interface FiltersProps {
  category: string | null;
  setCategory: any;
  rating: string | null;
  setRating: any;
  offers: string | null;
  setOffers: any;
  sortby: string | null;
  setSortby: any;
}

const Filters: React.FC<FiltersProps> = ({
  category,
  setCategory,
  rating,
  setRating,
  offers,
  setOffers,
  sortby,
  setSortby,
}) => {
  const filtersData = [
    {
      title: "Category",
      position: "left",
      getter: category,
      setter: setCategory,
      values: [
        {
          value: "mobiles",
          placeholder: "Mobiles",
        },
        {
          value: "headphones",
          placeholder: "Headphones",
        },
        {
          value: "laptops",
          placeholder: "Laptops",
        },
        {
          value: "watches",
          placeholder: "Watches",
        },
        {
          value: "clear",
          placeholder: "Clear",
        },
      ],
    },
    {
      title: "Rating",
      position: "left",
      getter: rating,
      setter: setRating,
      values: [
        {
          value: "1",
          placeholder: "1 & above",
        },
        {
          value: "2",
          placeholder: "2 & above",
        },
        {
          value: "3",
          placeholder: "3 & above",
        },
        {
          value: "4",
          placeholder: "4 & above",
        },
        {
          value: "clear",
          placeholder: "Clear",
        },
      ],
    },
    {
      title: "Offers",
      position: "left",
      getter: offers,
      setter: setOffers,
      values: [
        {
          value: "30",
          placeholder: "30% off & above",
        },
        {
          value: "60",
          placeholder: "60% off & above",
        },
        {
          value: "clear",
          placeholder: "Clear",
        },
      ],
    },
    {
      title: "Sort by",
      position: "right",
      getter: sortby,
      setter: setSortby,
      values: [
        {
          value: "PLH",
          placeholder: "Price - Low to High",
        },
        {
          value: "PHL",
          placeholder: "Price - High to Low",
        },
        {
          value: "clear",
          placeholder: "Clear",
        },
      ],
    },
  ];

  const handleChange = (value: string, setter: any) => {
    !value || value === "clear" ? setter(null) : setter(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between">
      <div className="flex gap-1 md:gap-6">
        {filtersData.map((item, idx) => {
          if (item.position !== "left") return;

          return (
            <Select
              key={idx}
              onValueChange={(value) => handleChange(value, item.setter)}
              value={item.getter || undefined}
            >
              <SelectTrigger className="rounded-full font-semibold bg-slate-200">
                <SelectValue placeholder={item.title} />
              </SelectTrigger>
              <SelectContent>
                {item.values.map((kv, idx) => (
                  <SelectItem key={idx} value={kv.value}>
                    {kv.placeholder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}
      </div>
      <div>
        {filtersData.map((item, idx) => {
          if (item.position !== "right") return;

          return (
            <Select
              key={idx}
              onValueChange={(value) => handleChange(value, item.setter)}
              value={item.getter || undefined}
            >
              <SelectTrigger className="rounded-full font-semibold">
                <SelectValue placeholder={item.title} />
              </SelectTrigger>
              <SelectContent>
                {item.values.map((kv, idx) => (
                  <SelectItem key={idx} value={kv.value}>
                    {kv.placeholder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
