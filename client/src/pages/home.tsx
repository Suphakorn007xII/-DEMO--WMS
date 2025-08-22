import {
  GoodCustomer,
  GoodPart,
  WeeklySale,
  WorstPart,
} from '@/components/dashboard';
import weeklySale from '../data/weekly-sale.json';
import { Label } from '@/components/ui/label';

export const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-full p-1.5">
      <Label className="text-xl font-bold text-black/90">Dashboard</Label>
      <div className="flex gap-2 w-full h-full ">
        <div className="flex flex-col w-3/5 gap-2">
          <WeeklySale data={weeklySale} />
          <div className="flex gap-2 justify-between w-full h-full">
            <GoodPart />
            <WorstPart />
          </div>
        </div>
        <div className="flex w-2/5 h-full ">
          <GoodCustomer />
        </div>
      </div>
    </div>
  );
};
