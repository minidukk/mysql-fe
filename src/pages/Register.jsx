import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

function Register() {
  const { register } = useAuth();
  const [NV_TenNV, setNV_TenNV] = useState('');
  const [NV_NgaySinh, setNV_NgaySinh] = useState('');
  const [NV_DiaChi, setNV_DiaChi] = useState('');
  const [NV_SDT, setNV_SDT] = useState('');
  const [NV_MatKhau, setNV_MatKhau] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    register({ NV_TenNV, NV_NgaySinh, NV_DiaChi, NV_SDT, NV_MatKhau });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
      <Card sx={{ maxWidth: 400, width: '100%', padding: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Đăng Ký
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Tên NV"
              variant="outlined"
              fullWidth
              margin="normal"
              value={NV_TenNV}
              onChange={(e) => setNV_TenNV(e.target.value)}
            />
            <TextField
              label="Ngày Sinh"
              variant="outlined"
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={NV_NgaySinh}
              onChange={(e) => setNV_NgaySinh(e.target.value)}
            />
            <TextField
              label="Địa Chỉ"
              variant="outlined"
              fullWidth
              margin="normal"
              value={NV_DiaChi}
              onChange={(e) => setNV_DiaChi(e.target.value)}
            />
            <TextField
              label="Số Điện Thoại"
              variant="outlined"
              fullWidth
              margin="normal"
              value={NV_SDT}
              onChange={(e) => setNV_SDT(e.target.value)}
            />
            <TextField
              label="Mật Khẩu"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={NV_MatKhau}
              onChange={(e) => setNV_MatKhau(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Đăng Ký
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
