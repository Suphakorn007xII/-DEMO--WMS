import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import login from '../assets/images/login.png';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setToastAlert } = useToast();

  const PROJECT_ID = import.meta.env.VITE_APP_ID ?? 'wms';
  const lsKey = (k: string) => `${PROJECT_ID}:${k}`;

  const mockupKey = { username: 'admin123', password: 'admin123' };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ state สำหรับ toggle

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

      const authData = {
        user: { username },
        token: 'mock-token',
        signedAt: Date.now(),
      };

      const storage = remember ? window.localStorage : window.sessionStorage;
      storage.setItem(lsKey('auth'), JSON.stringify(authData));
      window.dispatchEvent(new Event('auth-change'));
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
    <div className="flex w-full h-full justify-center items-center px-4">
      <div className="flex w-full max-w-7xl overflow-hidden">
        {/* Left: Form */}
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

            {/* Password + Toggle */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="กรอกรหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
        <div className="hidden sm:flex w-1/2 items-center justify-center">
          <img src={login} alt="image" className="object-cover max-h-[100%]" />
        </div>
      </div>
    </div>
  );
};
