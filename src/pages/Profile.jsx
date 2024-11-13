import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import UserCongTac from '../components/UserCongTac';
import UserDMLuong from '../components/UserDMLuong';
import UserLuong from '../components/UserLuong';
import DanhSachNghiPhep from '../components/NghiPhepList';

function Profile() {
    const { user, logout } = useAuth();

    if (!user) return <Typography variant="h6" align="center">Bạn chưa đăng nhập</Typography>;

    return (
        <Box display="flex" justifyContent="center" alignItems="flex-start" sx={{ marginTop: 1 }}>
            <Grid container spacing={2} sx={{ padding: 3 }}>
                
                <Grid item xs={12} md={4}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="h5" align="center" gutterBottom>
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
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12}>
                                    <UserCongTac />
                                </Grid>
                                <Grid item xs={12}>
                                    <UserDMLuong />
                                </Grid>
                            </Grid>
                            {/* <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={logout}
                            >
                                Đăng Xuất
                            </Button> */}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="h5" align="center" gutterBottom>
                                Yêu Cầu Nghỉ Phép
                            </Typography>
                            <DanhSachNghiPhep />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="h5" align="center" gutterBottom>
                                Lương Thực Lãnh
                            </Typography>
                            <UserLuong/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Profile;
