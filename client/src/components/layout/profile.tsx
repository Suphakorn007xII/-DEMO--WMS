import { MenuIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4">
      {/* ปุ่ม login: โชว์เฉพาะจอ ≥ sm */}
      <div
        className="text-black/80 text-sm hidden sm:block cursor-pointer"
        onClick={() => navigate('/login')}
      >
        เข้าสู่ระบบ
      </div>

      {/* Hamburger menu: โชว์เฉพาะมือถือ */}
      <MenuIcon className="h-10 block sm:hidden cursor-pointer" />
    </div>
  );
};
