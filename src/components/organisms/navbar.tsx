import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar';
import { ThemeSwitch } from '@/components/atoms/theme-switch';
import LogoButton from '@/components/molecules/logo-button';
import { SearchBar } from '@/components/molecules/search-bar';
import { supabase } from '@/supabase/supabase';
import { Button } from '@heroui/button';
import { DropdownFilter } from '../molecules/DropdownFilter';
import { useUserStore } from '@/store/userStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {

    async function fetchCategories() {
      const { data, error } = await supabase.from('products').select('category');
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }
      if (data) {
        const uniqueCategories = [...new Set(data.map((item) => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      }
    }
    fetchCategories();

    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get('category') || '';
    if (categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [location.search]);

  const handleAccountClick = () => {
    navigate(user ? '/account' : '/login'); 
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <LogoButton />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden lg:flex">
        <NavbarItem>
          <DropdownFilter
            items={categories}
            selectedItem={selectedCategory}
            setSelectedItem={setSelectedCategory}
            label="Каталог"
            queryKey="category"
          />
        </NavbarItem>
        <NavbarItem>
          <Button variant="ghost" onPress={() => navigate('/promotions')}>
            Акции
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="ghost" onPress={handleAccountClick}>
            Personal Account
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="ghost" onPress={() => navigate('/cart')}>
            Cart
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="ghost" onPress={() => navigate('/about')}>
            About
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <SearchBar />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <DropdownFilter
            items={categories}
            selectedItem={selectedCategory}
            setSelectedItem={setSelectedCategory}
            label="Каталог"
            queryKey="category"
          />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button variant="ghost" onPress={() => navigate('/promotions')}>
            Акции
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button variant="ghost" onPress={handleAccountClick}>
            Личный аккаунт
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button variant="ghost" onPress={() => navigate('/cart')}>
            Cart
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button variant="ghost" onPress={() => navigate('/about')}>
            About
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <SearchBar />
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};