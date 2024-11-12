import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Card, CardContent, Typography, Grid2 } from '@mui/material';
import UserCongTac from '../components/UserCongTac';
import UserDMLuong from '../components/UserDMLuong';
import DanhSachNghiPhep from '../components/NghiPhepList';

function Profile() {
    const { user, logout } = useAuth();

    if (!user) return <Typography variant="h6" align="center">Bạn chưa đăng nhập</Typography>;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop:2}}>
            <Card sx={{ padding: 2 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Thông Tin Nhân Viên
                    </Typography>
                    <Typography variant="body1">
                        <strong>Mã NV:</strong> {user.NV_Ma}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Tên:</strong> {user.NV_TenNV}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Vai Trò:</strong> {user.NV_Role}
                    </Typography>
                    <Grid2 container spacing={2} mt={2}>
                        <Grid2 item xs={12} sm={6}>
                            <UserCongTac />
                        </Grid2>
                        
                        <Grid2 item xs={12} sm={6}>
                            <UserDMLuong />
                        </Grid2>
                        
                        
                    </Grid2>
                    <DanhSachNghiPhep/>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={logout}
                    >
                        Đăng Xuất
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Profile;
