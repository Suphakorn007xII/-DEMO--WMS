import { Outlet } from 'react-router-dom';
import { NavBar } from './nav-bar';

export const Layout = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] ">
      <NavBar />
      <main className="flex w-full h-full ">
        <div className="w-full 3xl:max-w-[2000px] 2xl:max-w-[1800px] xl:max-w-[1200px] mx-auto ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
