import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (NV_Ma, NV_MatKhau) => {
    try {
      const response = await axios.post('http://localhost:3030/api/auth/login', { NV_Ma, NV_MatKhau });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/profile');
    } catch (error) {
      alert(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3030/api/auth/register', userData);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:3030/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      }
    } catch (error) {
      console.error('Lấy thông tin người dùng thất bại', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    fetchUserInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
