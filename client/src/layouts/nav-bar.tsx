import { Logo, MainMenu, MainSearch, Profile } from '@/components/layout';

export const NavBar = () => {
  return (
    <div className="w-full border-b-2 shadow-sm">
      <div className="flex h-16 items-center justify-between max-w-7xl mx-auto px-4 gap-8">
        <Logo />
        <MainSearch />
        <Profile />
      </div>
      <div className="max-w-7xl mx-auto px-4 hidden sm:block">
        <MainMenu />
      </div>
    </div>
  );
};
