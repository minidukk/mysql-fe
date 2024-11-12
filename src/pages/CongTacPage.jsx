import React from 'react';
import CongTacList from '../components/CongTacList';
import { Container } from '@mui/material';

const CongTacPage = () => {
  return (
    <Container component="main" maxWidth="lg">
      <CongTacList />
    </Container>
  );
};

export default CongTacPage;
