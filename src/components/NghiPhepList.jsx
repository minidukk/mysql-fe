import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

function DanhSachNghiPhep() {
  const { user } = useAuth(); 
  const [nghiPhepList, setNghiPhepList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.NV_Ma) {
      setError('Không có thông tin nhân viên.');
      setLoading(false);
      return;
    }

    const fetchNghiPhepData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/api/nghiphep/${user.NV_Ma}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a.NN_NgayNghi);
          const dateB = new Date(b.NN_NgayNghi);
          return dateB - dateA; 
        });

        setNghiPhepList(sortedData);  
      } catch (error) {
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchNghiPhepData();
  }, [user]);

  if (loading) {
    return <Typography variant="h6" align="center">Đang tải...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
      <Card sx={{ maxWidth: 800, width: '100%', padding: 2 }}>
        <CardContent>
          {/* <Typography variant="h6" align="center" gutterBottom>
            Yêu Cầu Nghỉ Phép
          </Typography> */}
          {nghiPhepList.length === 0 ? (
            <Typography variant="h6" align="center">Không có dữ liệu nghỉ phép.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày Nghỉ</TableCell>
                  <TableCell>Ghi Chú</TableCell>
                  <TableCell>Trạng Thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nghiPhepList.map((nghiPhep) => (
                  <TableRow key={nghiPhep.NN_Ma}>

                    <TableCell>{new Date(nghiPhep.NN_NgayNghi).toLocaleDateString()}</TableCell>
                    <TableCell>{nghiPhep.NN_GhiChu}</TableCell>
                    <TableCell>
                      {nghiPhep.NN_KiemDuyet === 0 ? (
                        <span style={{ color: 'orange' }}>Chưa Duyệt</span>
                      ) : (
                        <span style={{ color: 'green' }}>Đã Duyệt</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default DanhSachNghiPhep;
