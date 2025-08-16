import { Routes, Route } from 'react-router-dom';

import { Layout } from './layouts/layout';
import { HomePage, ErrorPage, LoginPage, ManageStockPage } from './pages';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/manage-stock" element={<ManageStockPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
