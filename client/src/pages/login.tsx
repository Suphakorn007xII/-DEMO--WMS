import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setToastAlert } = useToast();

  // ---- Config: ตั้งชื่อโปรเจ็กต์เพื่อใช้ทำ namespace key ----
  const PROJECT_ID = import.meta.env.VITE_APP_ID ?? 'wms';
  const lsKey = (k: string) => `${PROJECT_ID}:${k}`;

  // ---- Mockup credential สำหรับทดสอบ ----
  const mockupKey = { username: 'admin123', password: 'admin123' };

  // ---- Local state ----
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const ok =
        username.trim() === mockupKey.username &&
        password === mockupKey.password;

      if (!ok) {
        setToastAlert({
          type: 'error',
          message: 'Invalid credentials',
          description: 'กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง',
        });
        return;
      }

      // payload ที่จะเก็บหลังล็อกอิน (ปรับตามจริงได้)
      const authData = {
        user: { username },
        token: 'mock-token', // ในระบบจริงให้ใช้ token จาก backend
        signedAt: Date.now(),
      };

      // Remember me -> localStorage, ไม่ติ๊ก -> sessionStorage
      const storage = remember ? window.localStorage : window.sessionStorage;
      storage.setItem(lsKey('auth'), JSON.stringify(authData));

      setToastAlert({
        type: 'success',
        message: 'Signed in',
        description: `ยินดีต้อนรับ ${username}`,
      });

      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center px-4 ">
      {' '}
      <div className="flex w-full max-w-7xl overflow-hidden">
        {' '}
        {/* Left: Form */}{' '}
        <div className="w-full sm:w-1/2 p-8 space-y-6 border-[1px] sm:border-[0px] rounded-2xl sm:rounded-none">
          <h2 className="text-2xl font-bold text-gray-800">เข้าสู่ระบบ</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="space-y-1">
              <Label htmlFor="username">ชื่อผู้ใช้/อีเมล</Label>
              <Input
                id="username"
                type="text"
                placeholder="กรอกชื่อผู้ใช้หรืออีเมล"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(Boolean(v))}
                />
                <Label htmlFor="remember" className="font-normal">
                  จดจำฉัน
                </Label>
              </div>
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() =>
                  setToastAlert({
                    type: 'info',
                    message: 'Forgot password',
                    description: 'ติดต่อผู้ดูแลระบบเพื่อรีเซ็ตรหัสผ่าน',
                  })
                }
              >
                ลืมรหัสผ่าน?
              </button>
            </div>

            {/* Sign in */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
            </Button>
          </form>
        </div>
        {/* Right: Image */}
        <div className="hidden sm:flex w-1/2 items-center justify-center ">
          <img
            src="https://sdmntprcentralus.oaiusercontent.com/files/00000000-0af4-61f5-89d2-191ebd0d3be6/raw?se=2025-08-16T14%3A38%3A57Z&sp=r&sv=2024-08-04&sr=b&scid=9a1778e5-75ac-56c9-83bb-1dff12252288&skoid=04233560-0ad7-493e-8bf0-1347c317d021&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-16T00%3A39%3A03Z&ske=2025-08-17T00%3A39%3A03Z&sks=b&skv=2024-08-04&sig=ELt%2BalSqWkiQQaMNUgz2F3sBApMf8N6HukQgyzyxOX4%3D"
            alt="image"
            className="object-cover max-h-[100%]"
          />
        </div>
      </div>
    </div>
  );
};
