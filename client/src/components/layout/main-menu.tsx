import { Label } from '../ui/label';
import { useNavigate, useLocation } from 'react-router-dom';

export const MainMenu = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ ใช้ location
  const menu = [
    { name: 'หน้าแรก', navigate: '' },
    { name: 'จัดการคลังสินค้า', navigate: 'manage-stock' },
    { name: 'จัดการข้อมูลลูกค้า', navigate: 'manage-customer' },
    { name: 'จัดการข้อมูลพนักงาน', navigate: 'manage-employee' },
  ];

  return (
    <div className="flex gap-8 pb-2.5 w-full items-center justify-center">
      {menu.map((item, i) => {
        const path = `/${item.navigate}`; // ✅ base path ของคุณ (ปรับตามจริง)
        const isActive =
          location.pathname === path ||
          (item.navigate === '' && location.pathname === '/wms');

        return (
          <Label
            key={i}
            className={`cursor-pointer text-xl hover:text-blue-600 ${
              isActive ? 'text-blue-600 font-bold' : ''
            }`}
            onClick={() => navigate(path)}
          >
            {item.name}
          </Label>
        );
      })}
    </div>
  );
};
