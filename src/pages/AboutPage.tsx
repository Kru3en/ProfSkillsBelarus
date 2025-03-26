import React from 'react';
import DefaultLayout from "@/layouts/default";

const AboutPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Блок 1: Цели и принципы работы платформы */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">О нас</h1>
          <p className="text-gray-700 dark:text-gray-300">
            Наша платформа создана для того, чтобы предоставить клиентам доступ к широкому ассортименту техники по конкурентным ценам. Мы стремимся к тому, чтобы каждый пользователь мог легко найти и приобрести нужный товар, получая при этом высокий уровень сервиса и поддержки.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Основные принципы нашей работы:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Честность и прозрачность во всех операциях</li>
            <li>Высокое качество обслуживания клиентов</li>
            <li>Постоянное обновление ассортимента и акций</li>
            <li>Поддержка и консультации на всех этапах покупки</li>
          </ul>
        </section>

        {/* Блок 2: Направления работы сайта */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Направления работы</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Наш сайт предлагает несколько ключевых направлений:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Продажа новой и б/у техники</li>
            <li>Сервисное обслуживание и ремонт</li>
            <li>Консультации по выбору техники</li>
            <li>Акции и специальные предложения для постоянных клиентов</li>
          </ul>
        </section>

        {/* Блок 3: Контактная информация и партнеры */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Контакты и партнеры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Контактная информация */}
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Электронная почта:</strong> support@error.com
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Telegram:</strong> <a href="https://t.me/undenfined" className="text-blue-500">t.me/undenfined</a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Instagram:</strong> <a href="https://instagram.com/error" className="text-blue-500">instagram.com/error</a>
              </p>
            </div>

            {/* Отделы и сотрудники */}
            <div>
              <h3 className="text-xl font-bold mb-2">Отделы</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Официальный офис:</strong>
                  <ul className="list-inside ml-4">
                    <li>Иван Иванов - Менеджер по продажам, +375 (29) 123-45-67</li>
                    <li>Мария Петрова - Специалист по работе с клиентами, +375 (29) 765-43-21</li>
                  </ul>
                </li>
                <li>
                  <strong>Техническая поддержка:</strong>
                  <ul className="list-inside ml-4">
                    <li>Алексей Сидоров - Инженер, +375 (33) 987-65-43</li>
                    <li>Елена Кузнецова - Специалист по ремонту, +375 (33) 543-21-98</li>
                  </ul>
                </li>
                <li>
                  <strong>Отдел маркетинга:</strong>
                  <ul className="list-inside ml-4">
                    <li>Ольга Смирнова - Маркетолог, +375 (25) 234-56-78</li>
                    <li>Дмитрий Козлов - Специалист по рекламе, +375 (25) 876-54-32</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Партнеры */}
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Наши партнеры</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>TechPartner Ltd. - Поставщик техники</li>
              <li>ServicePro - Сервисный центр</li>
              <li>PromoAgency - Маркетинговое агентство</li>
            </ul>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;