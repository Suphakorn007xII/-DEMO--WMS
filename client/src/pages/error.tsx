import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full h-full flex-col gap-4">
      <Label className="text-2xl">404</Label>
      <Label className="text-xl">Not found page</Label>
      <Button className="w-40 cursor-pointer" onClick={() => navigate('/')}>
        Back to home page
      </Button>
    </div>
  );
};
