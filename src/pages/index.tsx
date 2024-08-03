// src/pages/index.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const tokenID = localStorage.getItem('tokenID');
    if (tokenID) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
};

export default IndexPage;
