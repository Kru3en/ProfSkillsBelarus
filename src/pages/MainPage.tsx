import React from 'react';
import { title } from '@/components/atoms/primitives';
import DefaultLayout from '@/layouts/default';
import PromotionsSlider from '@/components/molecules/PromotionsSlider';
import PopularProducts from '@/components/molecules/PopularProducts';
import PopularBrands from '@/components/molecules/PopularBrands';
import StaticAds from '@/components/molecules/StaticAds';

export default function MainPage() {
  return (
    <DefaultLayout>
      {/* Ограниченные акции – слайдер */}
      <section className="py-8 md:py-10 bg-gray-50 dark:bg-black">
        <PromotionsSlider />
      </section>

      {/* Блок популярных товаров */}
      <section className="py-8 md:py-10 bg-gray-50 dark:bg-black">
        <PopularProducts />
      </section>

      {/* Блок популярных брендов */}
      <section className="py-8 md:py-10 bg-gray-50 dark:bg-black">
        <PopularBrands />
      </section>

      {/* Статические рекламные карточки сторонних сервисов */}
      <section className="py-8 md:py-10 bg-gray-50 dark:bg-black">
        <StaticAds />
      </section>
    </DefaultLayout>
  );
}