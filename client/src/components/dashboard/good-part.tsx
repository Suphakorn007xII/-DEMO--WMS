import { useMemo } from 'react';
import { data } from '../../data/good-part.json';
import { Label } from '../ui/label';

export const GoodPart = () => {
  const medal = (rank: number) =>
    rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

  // เรียงลำดับ: orders desc -> amount desc และไม่แก้ data ต้นฉบับ
  const items = useMemo(
    () =>
      [...data]
        .sort(
          (a, b) =>
            b.orders - a.orders ||
            b.amount - a.amount ||
            a.type.localeCompare(b.type)
        )
        .slice(0, 5), // เอา Top 5 ถ้าต้องการ
    []
  );

  return (
    <div className="border-[2px] flex flex-col w-full h-full items-start rounded-xl p-2 shadow  border-green-200">
      <Label className="p-1 text-sm font-bold">
        📈 สินค้าที่ขายดีประจำสัปดาห์
      </Label>

      {items.map((item, i) => (
        <div
          key={`${item.type}-${i}`}
          className="flex w-full justify-between pb-0.5 hover:bg-blue-50"
        >
          <div className="flex gap-2">
            <div className="text-lg font-semibold w-6 text-right">{i + 1}</div>
            <div className="flex flex-col">
              <div className="text-md font-medium">
                {item.type} {medal(i + 1)}
              </div>
              <div className="text-xs">{item.maker}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm font-medium">
              {item.orders.toLocaleString()} ชิ้น
            </div>
            <div className="text-xs">{item.amount.toLocaleString()} บาท</div>
          </div>
        </div>
      ))}
    </div>
  );
};
