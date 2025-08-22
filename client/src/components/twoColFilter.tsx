import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type TwoColFilterProps = {
  title: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  defaultOpen?: boolean;
};

export const TwoColFilter = ({
  title,
  options,
  value,
  onChange,
  defaultOpen = false,
}: TwoColFilterProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const selected = useMemo(() => new Set(value), [value]);

  const toggle = (opt: string) => {
    const next = new Set(selected);
    if (next.has(opt)) {
      next.delete(opt);
    } else {
      next.add(opt);
    }
    onChange(Array.from(next));
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <button
        type="button"
        className="flex items-center justify-between w-full"
        onClick={() => setOpen((v) => !v)}
      >
        <Label className="text-xs text-muted-foreground">{title}</Label>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Body */}
      {open ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <Checkbox
                  checked={selected.has(opt)}
                  onCheckedChange={() => toggle(opt)}
                />
                <span className="text-xs">{opt}</span>
              </label>
            ))}
          </div>

          {/* Footer ของ filter เดียว */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="secondary" size="sm" onClick={() => onChange([])}>
              เคลียร์
            </Button>
            <div className="text-xs text-muted-foreground">
              เลือก {value.length}/{options.length}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
