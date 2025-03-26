import React from 'react';

const StaticAds: React.FC = () => {
  const ads = [
    {
      id: 1,
      imageUrl: 'https://belretail.by//files/resizedbg/260x260/retailprofile/29/3134585e4ba7759576f60efb2014aef6.jpg',
      link: 'https://5element.by/',
      description: '5 элемент',
    },
    {
      id: 2,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT6iagdUXC7UGmhpD2VFcEUPCbA60bGeSfvw&s',
      link: 'https://tuodivano.ru/',
      description: 'Туодуо',
    },
    {
      id: 3,
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/004/567/683/non_2x/aliexpress-logo-in-flat-design-free-vector.jpg',
      link: 'https://www.aliexpress.com/',
      description: 'Алиэкспресс',
    },
    {
      id: 4,
      imageUrl: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65d705226b45cf60f59c96a9_65d705d2040cb57dacfaa057/scale_1200',
      link: 'https://www.kufar.by/l/r~brest',
      description: 'Куфар',
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Наши партнёры
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {ads.map((ad) => (
          <a
            key={ad.id}
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded flex flex-col items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src={ad.imageUrl}
              alt={ad.description}
              className="w-full h-32 object-cover"
            />
            <p className="mt-2 text-gray-700 dark:text-gray-300">{ad.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StaticAds;