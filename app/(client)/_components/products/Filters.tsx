"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(client)/_components/ui/select";

import { useQueryState } from "next-usequerystate";

const Filters = () => {
  const [category, setCategory] = useQueryState("category");
  const [rating, setRating] = useQueryState("rating");
  const [offers, setOffers] = useQueryState("offers");
  const [sortby, setSortby] = useQueryState("sortby");

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
          placeholder: "1+",
        },
        {
          value: "2",
          placeholder: "2+",
        },
        {
          value: "3",
          placeholder: "3+",
        },
        {
          value: "4",
          placeholder: "4+",
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
    <div className="flex justify-between">
      <div className="flex gap-8">
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
