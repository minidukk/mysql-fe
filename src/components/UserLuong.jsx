import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Typography, Paper } from '@mui/material';

const UserLuong = () => {
  const { user, loading: authLoading } = useAuth();
  const [luong, setLuong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLuongInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/api/luongs/${user.NV_Ma}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLuong(response.data);
    } catch (error) {
      setError('Lỗi khi tải thông tin lương của người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLuongInfo();
    }
  }, [user]);

  if (authLoading || loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Thông Tin Lương Của Bạn
      </Typography>
      {luong ? (
        <>
          <Typography>Tháng Năm: {new Date(luong.L_ThangNam).toLocaleDateString()}</Typography>
          <Typography>Số Buổi Làm: {luong.L_SoBuoiLam}</Typography>
          <Typography>Lương Thực Lãnh: {luong.L_LuongThucLanh.toLocaleString()} VND</Typography>
        </>
      ) : (
        <Typography>Không có thông tin lương.</Typography>
      )}
    </Paper>
  );
};

export default UserLuong;
