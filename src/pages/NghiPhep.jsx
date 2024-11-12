import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NghiPhep() {
  const { user } = useAuth();
  const [NV_NgayNghi, setNV_NgayNghi] = useState('');
  const [NN_GhiChu, setNN_GhiChu] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      NV_Ma: user.NV_Ma,
      NN_NgayNghi: NV_NgayNghi,
      NN_GhiChu: NN_GhiChu,
    };

    try {
      const response = await axios.post(
        'http://localhost:3030/api/nghiphep/',
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log("Leave Request Submitted:", response.data);
      alert("Đơn nghỉ phép đã được gửi thành công!");
      navigate('/profile')
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Có lỗi xảy ra khi gửi đơn nghỉ phép.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
      <Card sx={{ maxWidth: 400, width: '100%', padding: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Đơn Nghỉ Phép
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Mã Nhân Viên"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.NV_Ma} // Automatically fills with user's NV_Ma
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Ngày Nghỉ"
              variant="outlined"
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={NV_NgayNghi}
              onChange={(e) => setNV_NgayNghi(e.target.value)}
            />
            <TextField
              label="Ghi Chú"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={NN_GhiChu}
              onChange={(e) => setNN_GhiChu(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Gửi Đơn
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NghiPhep;
