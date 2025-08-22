import type { FC } from 'react';
import { useMemo } from 'react';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip, // <- ใช้ Tooltip ของ Recharts
} from 'recharts';
import { Label } from '../ui/label';

export interface WeeklyRow {
  day: string;
  orders: number;
  amount: number;
}

export interface WeeklySalesChartProps {
  data: WeeklyRow[] | { data: WeeklyRow[] };
  height?: number | string;
}

const DAY_ORDER = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const DAY_THAI: Record<string, string> = {
  Monday: 'จันทร์',
  Tuesday: 'อังคาร',
  Wednesday: 'พุธ',
  Thursday: 'พฤหัสฯ',
  Friday: 'ศุกร์',
  Saturday: 'เสาร์',
  Sunday: 'อาทิตย์',
};
const currencyTHB = (n: number) =>
  n.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  });

export const WeeklySale: FC<WeeklySalesChartProps> = ({
  data,
  height = 240,
}) => {
  const rows = useMemo<WeeklyRow[]>(() => {
    const arr = Array.isArray(data) ? data : (data as any)?.data ?? [];
    const isEn = arr.every((d: any) => DAY_ORDER.includes(d.day));
    const sorted = isEn
      ? [...arr].sort(
          (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
        )
      : arr;
    return sorted.map((r: any) => ({ ...r, day: DAY_THAI[r.day] ?? r.day }));
  }, [data]);

  const chartConfig = {
    orders: { label: 'จำนวนออเดอร์ (รายการ)', color: 'hsl(var(--chart-1))' },
    amount: { label: 'ยอดขาย (บาท)', color: 'hsl(var(--chart-2))' },
  } as const;

  return (
    <div className="border-2 rounded-lg p-2 shadow">
      <Label className="p-1 text-sm font-bold">
        📊ยอดขายประจำสัปดาห์ (1 สิงหาคม - 7 สิงหาคม 2025)
      </Label>
      <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={rows}
            margin={{ top: 10, right: 18, bottom: 10, left: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: 'วัน', position: 'insideBottom', dy: 12 }}
            />

            <YAxis
              yAxisId="L"
              allowDecimals={false}
              width={50}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'จำนวนออเดอร์',
                angle: -90,
                position: 'insideLeft',
                dx: -8,
              }}
            />
            <YAxis
              yAxisId="R"
              orientation="right"
              width={68}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
              }
              tickLine={false}
              axisLine={false}
              label={{
                value: 'ยอดขาย',
                angle: 90,
                position: 'insideRight',
                dx: 8,
              }}
            />

            {/* Tooltip จาก Recharts -> หน่วยไม่สลับแล้ว */}
            <Tooltip
              formatter={(v: any, name) =>
                name === 'amount'
                  ? [currencyTHB(v as number), 'ยอดขาย (บาท)']
                  : [`${v} รายการ`, 'จำนวนออเดอร์ (รายการ)']
              }
              labelFormatter={(label: any) => `วัน${label}`}
            />

            <ChartLegend content={<ChartLegendContent />} />

            {/* Bar: Orders (มี fallback สี) */}
            <Bar
              yAxisId="L"
              dataKey="orders"
              name="จำนวนออเดอร์ (รายการ)"
              fill="var(--chart-10, #0ea5e9)"
              radius={[6, 6, 0, 0]}
            />

            {/* Line: Amount (เส้นประ + fallback สี) */}
            <Line
              yAxisId="R"
              type="monotone"
              dataKey="amount"
              name="ยอดขาย (บาท)"
              stroke="var(--chart-2, #2563eb)"
              strokeWidth={3}
              strokeDasharray="6 4"
              dot={{ r: 3 }}
              activeDot={{ r: 4 }}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
