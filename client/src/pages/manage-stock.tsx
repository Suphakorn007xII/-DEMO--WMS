import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusSquare, Filter } from 'lucide-react';
import stock from '../data/stock.json';
import { TableStock, TwoColFilter } from '@/components';
import type { StockItem } from '@/type';
import { useSearchParams } from 'react-router-dom';

const getRows = (raw: any): StockItem[] =>
  (Array.isArray(raw) ? raw : raw?.data) ?? [];

function usePagination<T>(rows: T[], pageSize: number) {
  const [page, setPage] = useState(1);
  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = useMemo(
    () => rows.slice((page - 1) * pageSize, page * pageSize),
    [rows, page, pageSize]
  );

  useEffect(() => {
    if (page > pageCount) setPage(1);
  }, [pageCount]);

  return { page, setPage, pageCount, current, total };
}

// ---------- Main Page ----------

export const ManageStockPage = () => {
  const [searchParams] = useSearchParams();

  // ⬇️ อ่านจาก URL ทุกครั้งที่เปลี่ยน (เช่นมาจาก MainSearch)
  useEffect(() => {
    const k = searchParams.get('key') ?? '';
    setQuery(k);
    setPage(1);
  }, [searchParams]); // รันเมื่อ URL query เปลี่ยน

  const rows = useMemo(() => getRows(stock) as StockItem[], []);

  const makers = useMemo(
    () => Array.from(new Set(rows.map((r) => r.maker))).sort(),
    [rows]
  );
  const types = useMemo(
    () => Array.from(new Set(rows.map((r) => r.type))).sort(),
    [rows]
  );

  // Filters
  const [selectedMakers, setSelectedMakers] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');

  type SortKey = keyof StockItem;
  const [sortKey, setSortKey] = useState<SortKey>('product_id');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    let out = rows;

    if (selectedMakers.length)
      out = out.filter((r) => selectedMakers.includes(r.maker));
    if (selectedTypes.length)
      out = out.filter((r) => selectedTypes.includes(r.type));

    if (debounced) {
      out = out.filter((r) => {
        const hay =
          `${r.product_id} ${r.maker} ${r.type} ${r.sku}`.toLowerCase();
        return hay.includes(debounced);
      });
    }

    const sorted = [...out].sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      if (typeof A === 'number' && typeof B === 'number')
        return sortAsc ? A - B : B - A;
      return sortAsc
        ? String(A).localeCompare(String(B))
        : String(B).localeCompare(String(A));
    });

    return sorted;
  }, [rows, selectedMakers, selectedTypes, debounced, sortKey, sortAsc]);

  // Pagination
  const [pageSize, setPageSize] = useState(15);
  const { page, setPage, pageCount, current, total } = usePagination(
    filtered,
    pageSize
  );

  return (
    <div className="flex w-full flex-col py-3 gap-3  overflow-auto">
      {/* Header */}
      <div className="flex items-center w-full justify-between">
        <Label className="text-xl font-bold text-black/90">Manage Stock</Label>
        <Button size="sm" className="cursor-pointer active:scale-95 text-xs">
          <PlusSquare className="mr-2 h-4 w-4" /> Create new
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex w-full gap-3">
        <div className="flex flex-col w-3/12 border rounded-md p-3 gap-4 bg-white">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" /> Filters
          </div>

          <TwoColFilter
            title="Maker"
            options={makers}
            value={selectedMakers}
            onChange={(v) => {
              setSelectedMakers(v);
              setPage(1);
            }}
          />

          <TwoColFilter
            title="Type"
            options={types}
            value={selectedTypes}
            onChange={(v) => {
              setSelectedTypes(v);
              setPage(1);
            }}
          />

          {/* เคลียร์ทุกตัวกรอง */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSelectedMakers([]);
              setSelectedTypes([]);
              setQuery('');
              setPage(1);
            }}
          >
            เคลียร์ทั้งหมด
          </Button>
        </div>

        {/* Search + Table */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex items-center gap-2">
            <Input
              placeholder="ค้นหาสินค้า (id/maker/type/sku)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="border rounded-md bg-white">
            <TableStock
              data={current}
              sortKey={sortKey}
              sortAsc={sortAsc}
              onSortChange={(key) => {
                if (sortKey === key) setSortAsc((v) => !v);
                else {
                  setSortKey(key);
                  setSortAsc(true);
                }
                setPage(1); // เปลี่ยนการเรียงแล้ว กลับไปหน้าแรก
              }}
            />

            {/* Footer: pagination & page size */}
            <div className="flex items-center justify-between p-3 text-sm">
              <div className="flex items-center gap-2">
                <span>แสดง</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(parseInt(e.target.value));
                    setPage(1);
                  }}
                  className="border rounded px-2 py-1"
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={60}>60</option>
                </select>
                <span>รายการ / หน้า</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {total.toLocaleString()} รายการ
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                  >
                    « First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    ‹ Prev
                  </Button>
                  <span>
                    หน้า {page} / {pageCount}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    disabled={page === pageCount}
                  >
                    Next ›
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(pageCount)}
                    disabled={page === pageCount}
                  >
                    Last »
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
