import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase/supabase';
import { useUserStore } from '@/store/userStore';
import DefaultLayout from '@/layouts/default';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, setUser } = useUserStore();
  const [login, setLogin] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (profile) {
      setLogin(profile.login);
      setPhotoUrl(profile.photo_url || '');
    }
  }, [user, profile, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase
        .from('users')
        .update({ login, photo_url: photoUrl || null })
        .eq('user_id', user?.id || '');

      if (error) throw error;

      if (user) {
        setUser(user, { login, photo_url: photoUrl || null });
      }
      setSuccess('Профиль успешно обновлен');
    } catch (err: any) {
      setError(err.message || 'Ошибка при обновлении профиля');
    }
  };

  const handleLogout = () => {
    useUserStore.getState().clearUser();
    navigate('/login');
  };

  if (!user) return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4 text-center">Загрузка...</div>
    </DefaultLayout>
  );

  return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Личный кабинет
        </h1>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <Input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Имя пользователя"
              className="w-full"
              required
            />
          </div>
          <div>
            <Input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="URL фото профиля"
              className="w-full"
            />
          </div>
          {/* Предпросмотр фото */}
          {photoUrl && (
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">Предпросмотр фото:</p>
              <img
                src={photoUrl}
                alt="Фото профиля"
                className="w-32 h-32 object-cover rounded-full border border-gray-300 dark:border-gray-600"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/150?text=Ошибка+загрузки';
                }}
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Сохранить
          </Button>
          <Button
            variant="ghost"
            onPress={handleLogout}
            className="w-full text-red-500"
          >
            Выйти
          </Button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AccountPage;