import React from 'react';
import ChucVuList from '../components/ChucVuList';
import { Container } from '@mui/material';

const ChucVuPage = () => {
  return (
    <Container component="main" maxWidth="lg">
      <ChucVuList />
    </Container>
  );
};

export default ChucVuPage;
