import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';

interface Product {
  id: string;
  description: string;
  photo_url: string;
  price: number;
  popular: boolean;
}

const PopularProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('popular', true);

        if (error) throw error;
        
        const productData = data || [];
        const uniqueIds = new Set(productData.map(p => p.id));
        if (uniqueIds.size !== productData.length) {
          console.warn('Duplicate product IDs detected:', productData);
        }
        
        if (mounted) {
          setProducts(productData);
        }
      } catch (err) {
        if (mounted) {
          setError('Не удалось загрузить популярные товары');
          console.error('Products fetch error:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (loading) {
    return <div className="w-full text-center text-gray-900 dark:text-gray-100">Загрузка...</div>;
  }
  if (error) {
    return <div className="w-full text-center text-red-500 dark:text-red-400">{error}</div>;
  }
  if (products.length === 0) {
    return <div className="w-full text-center text-gray-900 dark:text-gray-100">Нет популярных товаров</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Популярные товары
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.slice(0, visibleCount).map((product, index) => (
          <div
            key={product.id || `product-${index}`}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded"
          >
            <img
              src={product.photo_url}
              alt={product.description || 'Product'}
              className="w-full h-32 object-cover rounded"
            />
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {product.description || 'Нет описания'}
            </p>
            <p className="font-bold text-gray-900 dark:text-gray-100">
              {product.price} BYN
            </p>
          </div>
        ))}
      </div>
      {visibleCount < products.length && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-gray-500 dark:bg-blue-900 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
          >
            Показать ещё
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;