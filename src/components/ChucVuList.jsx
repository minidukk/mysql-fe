import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const ChucVuList = () => {
  const [chucVuList, setChucVuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChucVuList = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/chucvus', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setChucVuList(response.data);
      setLoading(false);
    } catch (error) {
      setError('Lỗi khi tải danh sách chức vụ');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChucVuList();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Danh Sách Chức Vụ
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã Chức Vụ</TableCell>
              <TableCell>Tên Chức Vụ</TableCell>
              <TableCell>Hệ Số Lương</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chucVuList.map((chucVu) => (
              <TableRow key={chucVu.CV_Ma}>
                <TableCell>{chucVu.CV_Ma}</TableCell>
                <TableCell>{chucVu.CV_TenCV}</TableCell>
                <TableCell>{chucVu.CV_HSL}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ChucVuList;
