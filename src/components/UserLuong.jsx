import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const UserLuong = () => {
  const { user, loading: authLoading } = useAuth();
  const [luongData, setLuongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLuongInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/api/luongs/${user.NV_Ma}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const sortedData = response.data.sort((a, b) => {
        const dateA = new Date(a.L_ThangNam);
        const dateB = new Date(b.L_ThangNam);
        return dateB - dateA; 
      });
      setLuongData(sortedData);
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
      {/* <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Thông Tin Lương Của Bạn
      </Typography> */}
      {luongData.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tháng Năm</TableCell>
                <TableCell>Số Buổi Làm</TableCell>
                <TableCell>Lương Thực Lãnh (VND)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {luongData.map((luong, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(luong.L_ThangNam).toLocaleDateString()}</TableCell>
                  <TableCell>{luong.L_SoBuoiLam}</TableCell>
                  <TableCell>{luong.L_LuongThucLanh.toLocaleString()} VND</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Không có thông tin lương.</Typography>
      )}
    </Paper>
  );
};

export default UserLuong;
