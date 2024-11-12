import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import ChucVuPage from './pages/ChucVuPage';
import CongTacPage from './pages/CongTacPage';
import Register from './pages/Register';
import NghiPhep from './pages/NghiPhep';

function App() {
  return (
    <Router>
      
      <AuthProvider>
      <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chucvu" element={<ChucVuPage />} />
          <Route path="/congtac" element={<CongTacPage />} />
          <Route path="/nghiphep" element={<NghiPhep />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
