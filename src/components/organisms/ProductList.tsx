import React from "react";
import { ProductCard } from "../molecules/ProductCard";

interface Product {
  product_id: number;
  category: string;
  description: string;
  photo_url: string;
  price: number;
  manufacturer: string;
}

interface ProductListProps {
  products: Product[];
  cart: { [key: number]: number };
  addToCart: (productId: number) => void;
  buyNow: (product: Product) => void;
  ratings: { [key: number]: number };
}

export const ProductList: React.FC<ProductListProps> = ({ products, cart, addToCart, buyNow, ratings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
          cart={cart}
          addToCart={addToCart}
          buyNow={buyNow}
          rating={ratings[product.product_id]}
        />
      ))}
    </div>
  );
};