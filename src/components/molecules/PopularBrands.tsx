import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';

const PopularBrands: React.FC = () => {
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .limit(3);
      if (error) {
        console.error(error);
      } else {
        setBrands(data || []);
      }
    }
    fetchBrands();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Популярные бренды
      </h2>
      <div className="flex justify-center space-x-4">
        {brands.map((brand, index) => (
          <div
          key={index}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded flex flex-col items-center"
          >
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="w-24 h-24 object-contain"
            />
            <p className="mt-2 font-bold text-gray-900 dark:text-gray-100">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBrands;