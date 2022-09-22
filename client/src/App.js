import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Admin from './pages/Admin';
import Home from "./pages/Home";
import Login from './pages/Login';
import NotFound from "./pages/NotFound"
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
