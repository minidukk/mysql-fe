import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const CongTacList = () => {
  const [congTacList, setCongTacList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCongTacList = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/congtacs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });

      setCongTacList(response.data);
      setLoading(false);
    } catch (error) {
      setError('Lỗi khi tải danh sách công tác');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCongTacList();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Danh Sách Công Tác
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Tên Nhân Viên</TableCell>
              <TableCell>Chức Vụ</TableCell>
              <TableCell>Phòng Ban</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {congTacList.map((congTac) => (
              <TableRow key={congTac.NV_Ma}>
                
                <TableCell>{congTac.NV_TenNV}</TableCell>
                <TableCell>{congTac.CV_TenCV}</TableCell>
                <TableCell>{congTac.PB_TenPhongBan}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CongTacList;
