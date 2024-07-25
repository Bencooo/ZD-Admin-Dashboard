// src/pages/home.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const tokenID = localStorage.getItem('tokenID');
    if (!tokenID) {
      router.push('/login');
    }
  }, [router]);

  return <div>Welcome to the Home Page</div>;
};

export default HomePage;
