import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 0.02 }}>
                    Trang Web Nhân Viên
                </Typography>

                <Typography sx={{ flexGrow: 1 }}>
                    <Button color="inherit" component={Link} to="/chucvu" sx={{ marginRight: 2 }}>
                        Chức vụ
                    </Button>
                    <Button color="inherit" component={Link} to="/congtac" sx={{ marginRight: 2 }}>
                        Công tác
                    </Button>
                    <Button color="inherit" component={Link} to="/nghiphep" sx={{ marginRight: 2 }}>
                        Nghỉ phép
                    </Button>
                </Typography>
                {!user ? (
                    <Button color="inherit" component={Link} to="/login">
                        Đăng nhập
                    </Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/profile" sx={{ marginRight: 2 }}>
                            {user.NV_TenNV}
                        </Button>
                        <Button color="inherit" onClick={logout}>
                            Đăng xuất
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
