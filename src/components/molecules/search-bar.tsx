import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {

      navigate(`/catalog?search=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <Input
        aria-label="Search"
        type="search"
        placeholder="Search products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button type="submit" variant="flat">
        Search
      </Button>
    </form>
  );
};
