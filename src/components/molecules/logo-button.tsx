import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/button';
import { Logo } from '@/components/atoms/logo/logo';
import styles from './logo-button.module.scss';

const LogoButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onPress={() => navigate('/')}
      className={styles.logoButton}
    >
      <Logo />
    </Button>
  );
};

export default LogoButton;
