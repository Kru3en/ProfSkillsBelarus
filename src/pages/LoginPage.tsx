import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase/supabase';
import { useUserStore } from '@/store/userStore';
import DefaultLayout from '@/layouts/default';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', trimmedEmail)
        .eq('password', trimmedPassword);

      if (error) {
        setError('Ошибка при запросе к базе данных');
        return;
      }

      if (data.length === 0) {
        setError('Неверная почта или пароль');
        return;
      }

      const userData = data[0];
      setUser({ id: userData.user_id, email: userData.email });
      navigate('/account');
    } catch (err: any) {
      setError('Произошла ошибка при входе');
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Вход</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Электронная почта"
              className="w-full"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full bg-gray-500 hover:bg-gray-600">
            Войти
          </Button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default LoginPage;