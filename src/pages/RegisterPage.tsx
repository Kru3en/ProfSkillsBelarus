import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase/supabase';
import { useUserStore } from '@/store/userStore';
import DefaultLayout from '@/layouts/default';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data: existingUsers } = await supabase
        .from('users')
        .select('email')
        .eq('email', email);

      if (existingUsers && existingUsers.length > 0) {
        throw new Error('Эта почта уже зарегистрирована');
      }

      const { data, error: insertError } = await supabase
        .from('users')
        .insert({
          email,
          password, 
          login: `user_${Date.now()}`, 
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setUser(
        { id: data.user_id, email: data.email },
        { login: data.login, photo_url: data.photo_url }
      );
      navigate('/account');
    } catch (err: any) {
      setError(err.message || 'Ошибка при регистрации');
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Регистрация</h1>
        <form onSubmit={handleRegister} className="space-y-4">
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
          <Button type="submit" className="w-full hover:bg-gray-300">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default RegisterPage;