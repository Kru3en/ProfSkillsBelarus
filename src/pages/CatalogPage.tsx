
import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import DefaultLayout from "@/layouts/default";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@heroui/input";
import { FilterGroup } from "../components/molecules/FilterGroup";
import { ProductList } from "../components/organisms/ProductList";

interface Product {
  product_id: number;
  category: string;
  description: string;
  photo_url: string;
  price: number;
  manufacturer: string;
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase.from("products").select("*");
      const urlParams = new URLSearchParams(location.search);
      const search = urlParams.get("search") || "";
      const category = urlParams.get("category") || "";
      const manufacturer = urlParams.get("manufacturer") || "";

      setSearchQuery(search);
      setSelectedCategory(category);
      setSelectedManufacturer(manufacturer);

      if (search) query = query.ilike("description", `%${search}%`);
      if (category) query = query.eq("category", category);
      if (manufacturer) query = query.eq("manufacturer", manufacturer);

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);

        if (Object.keys(ratings).length === 0) {
          const newRatings = (data || []).reduce((acc, product) => {
            acc[product.product_id] = Math.floor(Math.random() * 5) + 1;
            return acc;
          }, {} as { [key: number]: number });
          setRatings(newRatings);
        }
      }
    }
    fetchProducts();
  }, [location.search]); 


  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery
      ? product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesMinPrice = minPrice === "" || product.price >= minPrice;
    const matchesMaxPrice = maxPrice === "" || product.price <= maxPrice;
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesManufacturer = selectedManufacturer
      ? product.manufacturer === selectedManufacturer
      : true;
    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesCategory && matchesManufacturer;
  });

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const buyNow = (product: Product) => {
    if (!cart[product.product_id]) {
      setCart((prev) => ({ ...prev, [product.product_id]: 1 }));
    }
    navigate("/checkout");
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    setSelectedManufacturer("");
    setSearchQuery("");
    navigate("/catalog");
  };

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const manufacturers = [...new Set(products.map((p) => p.manufacturer).filter(Boolean))];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    const urlParams = new URLSearchParams(location.search);
    if (value) urlParams.set("search", value);
    else urlParams.delete("search");
    navigate(`/catalog?${urlParams.toString()}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    const urlParams = new URLSearchParams(location.search);
    if (value) urlParams.set(key, value);
    else urlParams.delete(key);
    if (key === "category") setSelectedCategory(value);
    if (key === "manufacturer") setSelectedManufacturer(value);
    navigate(`/catalog?${urlParams.toString()}`);
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Каталог товаров</h1>
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Поиск по описанию..."
          className="w-full mb-4"
        />
        <FilterGroup
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedCategory={selectedCategory}
          setSelectedCategory={(value) => handleFilterChange("category", value)}
          selectedManufacturer={selectedManufacturer}
          setSelectedManufacturer={(value) => handleFilterChange("manufacturer", value)}
          categories={categories}
          manufacturers={manufacturers}
          resetFilters={resetFilters}
      
        />
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-700 dark:text-gray-300 mt-8">
            <p className="mb-4">Товаров не найдено</p>
            <h2 className="text-xl font-bold mb-4">Другие товары</h2>
            <ProductList
              products={products}
              cart={cart}
              addToCart={addToCart}
              buyNow={buyNow}
              ratings={ratings}
            />
          </div>
        ) : (
          <div className="mt-8">
          <ProductList
            products={filteredProducts}
            cart={cart}
            addToCart={addToCart}
            buyNow={buyNow}
            ratings={ratings}
          />  </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CatalogPage;