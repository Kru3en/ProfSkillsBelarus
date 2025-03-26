import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";

interface DropdownFilterProps {
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  label: string;
  queryKey: string;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  items,
  selectedItem,
  setSelectedItem,
  label,
  queryKey,
}) => {
  const navigate = useNavigate();
  const location = useLocation();


  const goToAll = () => {
    setSelectedItem("");
    const urlParams = new URLSearchParams(location.search);
    urlParams.delete(queryKey);
    navigate(`/catalog?${urlParams.toString()}`, { replace: true });
  };

  const goToItem = (item: string) => {
    setSelectedItem(item);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set(queryKey, item); 
    navigate(`/catalog?${urlParams.toString()}`, { replace: true });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost">
          {selectedItem || label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={`${label} options`}>
  <>
    <DropdownItem key="all" onPress={goToAll}>
      Все товары
    </DropdownItem>
    {items.map((item) => (
      <DropdownItem key={item} onPress={() => goToItem(item)}>
        {item}
      </DropdownItem>
    ))}
  </>
</DropdownMenu>

    </Dropdown>
  );
};