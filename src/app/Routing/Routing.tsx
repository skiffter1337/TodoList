import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodolistList } from '../../features/todolists/TodolistList/TodolistList';
import { Login } from '../../features/auth/Login/Login';

export const Routing = () => {
  return (
    <Container fixed>
      <Grid container spacing={3}>
        <Routes>
          <Route path={'/'} element={<TodolistList />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/404'} element={<h2>404: Page not found</h2>} />
          <Route path={'*'} element={<Navigate to="/404" />} />
        </Routes>
      </Grid>
    </Container>
  );
};
