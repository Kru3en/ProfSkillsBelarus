import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import DefaultLayout from "@/layouts/default";

interface Promotion {
  promotion_id: number;
  photo_url: string;
  description: string;
  products: Product[];
}

interface Product {
  product_id: number;
  category: string;
  description: string;
  photo_url: string;
  price: number;
  manufacturer: string;
}

const PromotionsPage: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPromotions() {
      try {
        setLoading(true);
        
        const { data: promotionsData, error: promoError } = await supabase
          .from("promotions")
          .select(`
            promotion_id,
            photo_url,
            description,
            product_promotion (
              products (
                product_id,
                category,
                description,
                photo_url,
                price,
                manufacturer
              )
            )
          `);

        if (promoError) throw promoError;

        const formattedPromotions = promotionsData?.map((promo) => ({
          promotion_id: promo.promotion_id,
          photo_url: promo.photo_url,
          description: promo.description,
          products: promo.product_promotion.map((pp: any) => pp.products),
        })) || [];

        setPromotions(formattedPromotions);
      } catch (err) {
        setError("Ошибка при загрузке акций");
        console.error("Promotions fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPromotions();
  }, []);

  if (loading) return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4 text-center">Загрузка...</div>
    </DefaultLayout>
  );

  if (error) return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4 text-center text-red-500">{error}</div>
    </DefaultLayout>
  );

  return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Акции
        </h1>
        {promotions.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            Нет доступных акций
          </p>
        ) : (
          <div className="space-y-12">
            {promotions.map((promotion) => (
              <div
                key={promotion.promotion_id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={promotion.photo_url}
                    alt={promotion.description}
                    className="w-full md:w-1/3 h-48 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                      {promotion.description}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {promotion.products.map((product) => (
                        <div
                          key={product.product_id}
                          className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
                        >
                          <img
                            src={product.photo_url}
                            alt={product.description}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                          <p className="text-gray-900 dark:text-gray-100 font-medium">
                            {product.description}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {product.category} - {product.manufacturer}
                          </p>
                          <p className="text-gray-900 dark:text-gray-100 font-bold">
                            {product.price} BYN
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PromotionsPage;