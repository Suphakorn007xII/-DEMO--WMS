import { useEffect, useMemo, useState } from 'react';
import { LogIn, MenuIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type AuthData = {
  token: string;
  signedAt: number; // epoch ms
  user: { username: string; name?: string };
};

const STORAGE_KEY = 'wms:auth';
const SESSION_MS = 60 * 60 * 1000; // 60 นาที (ปรับตามต้องการ)

function readAuthRaw(): string | null {
  return (
    localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY)
  );
}

function safeParseAuth(raw: string | null): AuthData | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw) as AuthData;
    if (obj?.signedAt && obj.signedAt < 1e12) obj.signedAt *= 1000; // วินาที -> มิลลิ
    return obj && obj.user ? obj : null;
  } catch {
    return null;
  }
}

function initials2(text?: string) {
  if (!text) return '??';
  const s = text.trim();
  const [first, second] = s.split(/\s+/);
  const flat = (first ?? '') + (second ?? '');
  return flat.slice(0, 2).toUpperCase();
}

export const Profile = () => {
  const navigate = useNavigate();
  const { setToastAlert } = useToast();

  const [auth, setAuth] = useState<AuthData | null>(() =>
    safeParseAuth(readAuthRaw())
  );

  // ฟังก์ชัน refresh state กลาง
  const refreshAuth = () => setAuth(safeParseAuth(readAuthRaw()));

  // 1) ฟังอีเวนต์กำหนดเอง + storage (ข้ามแท็บ)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refreshAuth();
    };
    const onAuthChange = () => refreshAuth();

    window.addEventListener('storage', onStorage);
    window.addEventListener('auth-change', onAuthChange as EventListener);

    // เผื่อกรณีกลับมาที่แท็บนี้ (อาจหมดอายุไปแล้ว)
    const onVisible = () =>
      document.visibilityState === 'visible' && refreshAuth();
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('auth-change', onAuthChange as EventListener);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  // 2) จัดการหมดอายุ session
  useEffect(() => {
    if (!auth?.signedAt) return;

    const now = Date.now();
    const expireAt = auth.signedAt + SESSION_MS;
    const remaining = expireAt - now;

    const logout = () => {
      // ลบได้ทั้งสองที่ (เผื่อไม่รู้ว่าเก็บไว้ที่ไหน)
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
      setAuth(null);
      // แจ้งทุกคอมโพเนนต์ที่ฟังอยู่
      window.dispatchEvent(new Event('auth-change'));

      navigate('/login');
      setToastAlert({
        type: 'warning',
        message: 'Session expired',
        description: 'หมดเวลาใช้งาน กรุณาเข้าสู่ระบบอีกครั้ง',
      });
    };

    if (remaining <= 0) {
      logout();
      return;
    }
    const t = setTimeout(logout, remaining);
    return () => clearTimeout(t);
  }, [auth?.signedAt, navigate, setToastAlert]);

  const displayName = useMemo(
    () => auth?.user?.name || auth?.user?.username || '',
    [auth]
  );

  return (
    <div className="flex items-center gap-4">
      {auth ? (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gray-400 border-2 text-white flex items-center justify-center text-sm font-semibold select-none">
            {initials2(displayName)}
          </div>
          <div className="hidden sm:block text-sm text-black/90">
            {displayName}
          </div>
        </div>
      ) : (
        <div
          className="text-black/80 text-sm hidden sm:block cursor-pointer"
          onClick={() => navigate('/login')}
        >
          <div className="flex gap-2 hover:text-blue-500">
            <LogIn /> เข้าสู่ระบบ
          </div>
        </div>
      )}

      {/* Hamburger menu (mobile) */}
      <MenuIcon className="h-10 block sm:hidden cursor-pointer" />
    </div>
  );
};
