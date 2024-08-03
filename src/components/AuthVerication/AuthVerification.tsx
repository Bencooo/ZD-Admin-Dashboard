import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Spinner from '../Spinner/Spinner';

interface AuthVerificationProps {
  children: ReactNode;
}

const AuthVerification: React.FC<AuthVerificationProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const tokenID = localStorage.getItem('tokenID');
    if (!tokenID) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default AuthVerification;
