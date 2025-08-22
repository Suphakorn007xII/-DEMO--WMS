import { Outlet } from 'react-router-dom';
import { NavBar } from './nav-bar';

export const Layout = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] ">
      <NavBar />
      <main className="flex w-full h-full ">
        <div className="w-full max-w-6xl mx-auto ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
