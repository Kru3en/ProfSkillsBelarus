import React from "react";
import { Input } from "@heroui/input";
import { DropdownFilter } from "./DropdownFilter";
import { Button } from "@heroui/button";

interface FilterGroupProps {
  minPrice: number | "";
  setMinPrice: (value: number | "") => void;
  maxPrice: number | "";
  setMaxPrice: (value: number | "") => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedManufacturer: string;
  setSelectedManufacturer: (value: string) => void;
  categories: string[];
  manufacturers: string[];
  resetFilters: () => void;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedCategory,
  setSelectedCategory,
  selectedManufacturer,
  setSelectedManufacturer,
  categories,
  manufacturers,
  resetFilters,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex gap-2">
        <Input
          value={minPrice === "" ? "" : String(minPrice)} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMinPrice(e.target.value ? Number(e.target.value) : "")
          }
          placeholder="Мин. цена"
          type="number"
          className="w-32"
        />
        <Input
          value={maxPrice === "" ? "" : String(maxPrice)} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : "")
          }
          placeholder="Макс. цена"
          type="number"
          className="w-32"
        />
      </div>
      <DropdownFilter
        items={categories}
        selectedItem={selectedCategory}
        setSelectedItem={setSelectedCategory}
        label="Каталог"
        queryKey="category"
      />
      <DropdownFilter
        items={manufacturers}
        selectedItem={selectedManufacturer}
        setSelectedItem={setSelectedManufacturer}
        label="Производители"
        queryKey="manufacturer"
      />
      <Button onPress={resetFilters}>
        Сбросить фильтры
      </Button>
    </div>
  );
};