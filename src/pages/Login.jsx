import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const [NV_Ma, setNV_Ma] = useState('');
  const [NV_MatKhau, setNV_MatKhau] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(NV_Ma, NV_MatKhau);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop:2}}>
      <Card sx={{ maxWidth: 400, width: '100%', padding: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Đăng Nhập
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Mã NV"
              variant="outlined"
              fullWidth
              margin="normal"
              value={NV_Ma}
              onChange={(e) => setNV_Ma(e.target.value)}
            />
            <TextField
              label="Mật khẩu"
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
              Đăng Nhập
            </Button>
            Chưa có tài khoản? <Link to='/register'>Đăng ký</Link>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
