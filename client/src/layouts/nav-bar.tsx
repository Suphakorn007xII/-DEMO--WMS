import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, MainMenu, MainSearch, Profile } from '@/components/layout';

const getAuth = () =>
  localStorage.getItem('wms:auth') || sessionStorage.getItem('wms:auth');

export const NavBar = () => {
  const [auth, setAuth] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const read = () => {
      const value = getAuth();
      setAuth(value);

      // ถ้าไม่มี auth → เด้งไป login
      if (!value) {
        navigate('/login');
      }
    };

    read(); // อ่านครั้งแรก

    // ฟัง event จากหน้า Login และกรณีแก้ storage จากแท็บอื่น
    window.addEventListener('auth-change', read);
    window.addEventListener('storage', read);

    return () => {
      window.removeEventListener('auth-change', read);
      window.removeEventListener('storage', read);
    };
  }, [navigate]);

  return (
    <div className="w-full border-b-2 shadow-sm">
      <div className="flex h-16 items-center justify-between max-w-7xl mx-auto px-4 gap-8">
        <Logo />
        {auth && <MainSearch />}
        <Profile />
      </div>
      {auth && (
        <div className="max-w-7xl mx-auto px-4 hidden sm:block">
          <MainMenu />
        </div>
      )}
    </div>
  );
};
