import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, X } from 'lucide-react';

export const MainSearch = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = term.trim();
    if (!q) {
      navigate('/manage-stock');
      return;
    }
    navigate(`/manage-stock?key=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full items-center justify-center"
    >
      <div className="flex w-full max-w-7xl items-center gap-3 ">
        {/* input + search button (เหมือน YouTube) */}
        <div className="flex w-full">
          <div className="relative flex grow">
            <Input
              aria-label="ค้นหา"
              placeholder="ค้นหา"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="
                h-10 w-full
                rounded-l-full rounded-r-none
                border border-neutral-700
                bg-[#ffffff] text-neutral-900
                placeholder:text-neutral-800
                focus-visible:ring-0 focus-visible:border-gray-500
                px-4 pr-10
              "
            />
            {term && (
              <button
                type="button"
                aria-label="ล้างคำค้น"
                onClick={() => setTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            type="submit"
            aria-label="ค้นหา"
            variant="outline"
            className="
              h-10 rounded-r-full rounded-l-none
              border border-l-0 border-neutral-700
              bg-gray-50 hover:bg-gray-200
              px-4
            "
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};
