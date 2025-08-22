import { useMemo } from 'react';
import { data } from '../../data/worst-part.json';
import { Label } from '../ui/label';

export const WorstPart = () => {
  // เรียงลำดับ: orders ASC -> amount ASC (แย่สุดอยู่บน)
  const items = useMemo(
    () =>
      [...data]
        .sort(
          (a, b) =>
            a.orders - b.orders ||
            a.amount - b.amount ||
            a.type.localeCompare(b.type)
        )
        .slice(0, 5),
    []
  );

  return (
    <div className="border-[2px] flex flex-col w-full h-full items-start rounded-xl p-2 shadow border-red-200">
      <Label className="p-1 text-sm font-bold">
        📉 สินค้าที่ขายไม่ดีประจำสัปดาห์
      </Label>

      {items.map((item, i) => (
        <div
          key={`${item.type}-${i}`}
          className="flex w-full justify-between py-0.5 hover:bg-red-50/60"
        >
          <div className="flex gap-2">
            <div className="text-lg font-semibold w-6 text-right ">{i + 1}</div>
            <div className="flex flex-col">
              <div className="text-md font-medium">{item.type}</div>
              <div className="text-xs text-muted-foreground">{item.maker}</div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-sm font-medium">
              {item.orders.toLocaleString()} ชิ้น
            </div>
            <div className="text-xs text-muted-foreground">
              {item.amount.toLocaleString()} บาท
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
