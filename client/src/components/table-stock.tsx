import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { FC } from 'react';
import type { StockItem } from '@/type';
import { Eye, PenLine, Trash2 } from 'lucide-react';

interface Props {
  data: StockItem[];
  sortKey: keyof StockItem;
  sortAsc: boolean;
  onSortChange: (key: keyof StockItem) => void;
}

export const TableStock: FC<Props> = ({
  data,
  sortKey,
  sortAsc,
  onSortChange,
}) => {
  const headerCell = (key: keyof StockItem, label: string) => (
    <button
      onClick={() => onSortChange(key)}
      className="flex items-center gap-1 font-semibold"
    >
      <span>{label}</span>
      {sortKey === key && (
        <span className="text-xs opacity-70">{sortAsc ? '▲' : '▼'}</span>
      )}
    </button>
  );

  return (
    <div>
      <ScrollArea className="w-full ">
        <Table className="text-lg ">
          <TableHeader>
            <TableRow className=" ">
              <TableHead className="w-[90px]">
                {headerCell('product_id', 'ID')}
              </TableHead>
              <TableHead className="min-w-[120px]">
                {headerCell('maker', 'ยี่ห้อ')}
              </TableHead>
              <TableHead className="min-w-[160px]">
                {headerCell('type', 'หมวดหมู่')}
              </TableHead>
              <TableHead className="min-w-[220px]">
                {headerCell('sku', 'รหัสสินค้า')}
              </TableHead>
              <TableHead className="text-center">
                {headerCell('price1', 'ราคา 1')}
              </TableHead>
              <TableHead className="text-right">
                {headerCell('price2', 'ราคา 2')}
              </TableHead>
              <TableHead className="text-right">
                {headerCell('stock', 'คงเหลือ')}
              </TableHead>
              <TableHead className="text-right font-bold">
                แก้ไข/ดู/ลบ
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((r) => (
              <TableRow key={`${r.product_id}-${r.sku}`}>
                <TableCell className="font-medium">{r.product_id}</TableCell>
                <TableCell>{r.maker}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell className="font-mono text-lg">{r.sku}</TableCell>
                <TableCell className="text-left">
                  {r.price1.toLocaleString()}
                </TableCell>
                <TableCell className="text-left">
                  {r.price2.toLocaleString()}
                </TableCell>
                <TableCell className="text-left">
                  {r.stock.toLocaleString()}
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex gap-2.5 items-center justify-end">
                    <PenLine className="size-3.5 text-blue-600 hover:text-blue-500 cursor-pointer active:scale-95" />
                    <Eye className="size-3.5 text-yellow-500 hover:text-yellow-500 cursor-pointer active:scale-95" />
                    <Trash2 className="size-3.5 text-red-600 hover:text-red-500 cursor-pointer active:scale-95" />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  ไม่มีข้อมูลที่ตรงกับเงื่อนไข
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
