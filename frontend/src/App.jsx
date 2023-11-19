import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Physics } from './pages/Physics';


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/physics" element={<Physics />} />
      </Routes>
    </BrowserRouter>
  );
};
