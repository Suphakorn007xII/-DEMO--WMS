import { useMemo } from 'react';
import raw from '../../data/good-customer.json';
import { Label } from '../ui/label';

type Row = {
  rank: 1 | 2 | 3; // ความสำคัญของลูกค้า (Tier)
  customer_name: string;
  orders: number;
  amount: number;
};

const medal = (pos: number) =>
  pos === 1 ? '👑' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : null;
const currencyTHB = (n: number) =>
  n.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  });

const tierClass = (r: number) =>
  r === 1
    ? 'bg-red-100 text-red-700 border-red-200'
    : r === 2
    ? 'bg-amber-100 text-amber-700 border-amber-200'
    : 'bg-slate-100 text-slate-700 border-slate-200';

const tierText = (r: number) =>
  r === 1
    ? 'Tier 1 • สำคัญมาก'
    : r === 2
    ? 'Tier 2 • ปานกลาง'
    : 'Tier 3 • ทั่วไป';

export const GoodCustomer = () => {
  // รองรับทั้ง {data:[...]} และ [...] ตรง ๆ
  const items = useMemo<Row[]>(() => {
    const arr: Row[] = Array.isArray(raw as any)
      ? (raw as any)
      : (raw as any)?.data ?? [];
    return [...arr].sort(
      (a, b) =>
        b.orders - a.orders ||
        b.amount - a.amount ||
        a.customer_name.localeCompare(b.customer_name)
    );
  }, []);

  return (
    <div className="border-[2px] flex flex-col w-full h-full items-start rounded-xl shadow border-blue-200">
      <Label className="p-2 text-lg font-bold">
        👑 ลูกค้าดีเด่นประจำสัปดาห์ 10 อันดับแรก
      </Label>

      <div className="w-full divide-y">
        {items.map((item, i) => (
          <div
            key={`${item.customer_name}-${i}`}
            className="flex w-full justify-between py-0.5 px-2 hover:bg-muted/40"
          >
            {/* ซ้าย: ลำดับยอดขาย + ชื่อ + Tier */}
            <div className="flex gap-3 min-w-0">
              <div className="w-6 text-right font-semibold">{i + 1}</div>
              <div className="min-w-0">
                <div className="font-medium text-lg truncate">
                  {item.customer_name} {medal(i + 1)}
                </div>
                <span
                  className={`inline-block rounded-full border px-2 py-[2.5px] text-[10px] ${tierClass(
                    item.rank
                  )}`}
                >
                  {tierText(item.rank)}
                </span>
              </div>
            </div>

            {/* ขวา: ตัวเลขยอดขาย */}
            <div className="text-right">
              <div className="text-lg font-semibold">
                {item.orders.toLocaleString()} รายการ
              </div>
              <div className="text-md text-muted-foreground">
                {currencyTHB(item.amount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
