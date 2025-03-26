import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/supabase/supabase';

interface Promotion {
  id: string;
  description: string;
  photo_url: string;
}

const PromotionsSlider: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);

  useEffect(() => {
    async function fetchPromotions() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('promotions').select('*');
        if (error) throw error;
        
        const promoData = data || [];
        const uniqueIds = new Set(promoData.map(p => p.id));
        if (uniqueIds.size !== promoData.length) {
          console.warn('Duplicate promotion IDs detected:', promoData);
        }
        
        setPromotions(promoData);
      } catch (err) {
        setError('Ошибка при загрузке акций');
        console.error('Promotions fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPromotions();
  }, []);

  useEffect(() => {
    if (!sliderRef.current || !containerRef.current || promotions.length === 0) return;

    const slider = sliderRef.current;
    const container = containerRef.current;
    const itemWidth = 200 + 16; 
    const totalWidth = itemWidth * promotions.length;
console.log(container)
    const animate = () => {
      positionRef.current -= 1; 
      
      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = 0; 
      }
      
      slider.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [promotions]);

  const handleMouseEnter = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!sliderRef.current) return;

    const animate = () => {
      positionRef.current -= 1;
      const itemWidth = 200 + 16;
      const totalWidth = itemWidth * promotions.length;

      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = 0;
      }

      sliderRef.current!.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  if (loading) return <div className="text-center">Загрузка...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (promotions.length === 0) return <div className="text-center">Нет акций</div>;

  const infinitePromotions = [...promotions, ...promotions];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Ограниченные акции
      </h2>
      <div 
        ref={containerRef}
        className="overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={sliderRef}
          className="flex space-x-4"
          style={{ 
            whiteSpace: 'nowrap',
            willChange: 'transform',
          }}
        >
          {infinitePromotions.map((promo, index) => (
            <div
              key={`${promo.id}-${index}`} 
              className="min-w-[200px] flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-4 rounded inline-block"
            >
              <img
                src={promo.photo_url}
                alt={promo.description || 'Promotion'}
                className="w-full h-32 object-cover rounded"
              />
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {promo.description || 'Нет описания'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionsSlider;