import React from "react";
import { Button } from "@heroui/button";
import { Rating } from "../atoms/Rating";

interface Product {
  product_id: number;
  category: string;
  description: string;
  photo_url: string;
  price: number;
  manufacturer: string;
}

interface ProductCardProps {
  product: Product;
  cart: { [key: number]: number };
  addToCart: (productId: number) => void;
  buyNow: (product: Product) => void;
  rating: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, cart, addToCart, buyNow, rating }) => {
  return (
    <div className="p-4 rounded shadow hover:shadow-lg transition-shadow bg-gray-100 dark:bg-gray-800">
      <img
        src={product.photo_url}
        alt={product.description}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.description}</h3>
      <p className="text-gray-700 dark:text-gray-300">{product.manufacturer}</p>
      <p className="text-gray-900 dark:text-gray-100 font-bold">{product.price} BYN</p>
      <Rating value={rating} />
      <Button
        onPress={() => addToCart(product.product_id)}
        className="mt-2 w-full"
      >
        {cart[product.product_id] ? `В корзине (${cart[product.product_id]})` : "В корзину"}
      </Button>
      <Button
        onPress={() => buyNow(product)}
        className="mt-2 w-full"
      >
        Купить сейчас
      </Button>
    </div>
  );
};