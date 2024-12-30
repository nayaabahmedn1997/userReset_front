import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LOgin';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
   <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/register' exact element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

   </Routes>
  );
}

export default App;
