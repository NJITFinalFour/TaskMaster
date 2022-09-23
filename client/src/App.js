import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AdminHome from './pages/AdminHome';
import Home from "./pages/Home";
import Login from './pages/Login';
import NotFound from "./pages/NotFound"
import SignUp from './pages/SignUp';
import UserHome from './pages/UserHome';

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
