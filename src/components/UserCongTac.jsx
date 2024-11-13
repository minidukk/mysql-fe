import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Typography, Paper } from '@mui/material';

const UserCongTac = () => {
  const { user, loading: authLoading } = useAuth();
  const [congTac, setCongTac] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCongTacInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/api/congtacs/${user.NV_Ma}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCongTac(response.data);
    } catch (error) {
      setError('Lỗi khi tải thông tin công tác của người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCongTacInfo();
    }
  }, [user]);

  if (authLoading || loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Thông Tin Công Tác Của Bạn
      </Typography>
      {congTac ? (
        <>
          <Typography>Mã Nhân Viên: {congTac.NV_Ma}</Typography>
          <Typography>Phòng Ban: {congTac.PB_TenPhongBan}</Typography>
          <Typography>Chức Vụ: {congTac.CV_TenCV}</Typography>
          <Typography>Ngày Bắt Đầu: {new Date(congTac.CT_BatDau).toLocaleDateString()}</Typography>
          <Typography>Ngày Kết Thúc: {congTac.CT_KetThuc ? new Date(congTac.CT_KetThuc).toLocaleDateString() : 'Chưa xác định'}</Typography>
        </>
      ) : (
        <Typography>Không có thông tin công tác.</Typography>
      )}
    </Paper>
  );
};

export default UserCongTac;
