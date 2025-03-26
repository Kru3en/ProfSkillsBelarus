import { create } from 'zustand';
import { supabase } from '@/supabase/supabase';

interface UserState {
  user: { id: number; email: string } | null; 
  profile: { login: string; photo_url: string | null } | null;
  setUser: (user: { id: number; email: string }, profile?: { login: string; photo_url: string | null }) => void;
  clearUser: () => void;
  loadUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  setUser: (user, profile) => set({ user, profile }),
  clearUser: () => set({ user: null, profile: null }),
  loadUser: async () => {
    const currentState = useUserStore.getState();
    if (!currentState.user) {
      set({ user: null, profile: null });
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('login, photo_url')
      .eq('user_id', currentState.user.id)
      .single();

    if (error) {
      console.error('Ошибка загрузки профиля:', error);
      set({ user: currentState.user, profile: null });
    } else {
      set({
        user: currentState.user,
        profile: { login: data.login, photo_url: data.photo_url },
      });
    }
  },
}));