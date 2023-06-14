import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from '@mui/material/AppBar';
import { useActions } from '../../common/hooks';
import { authThunks } from '../../features/auth/auth.slice';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../features/auth';
import { selectStatus } from '../app.selector';

export const Header = () => {
  const status = useSelector(selectStatus);
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
  const { logout } = useActions(authThunks);
  const logoutHandler = () => logout({});

  const appBarClass = { backgroundColor: '#003459' };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={appBarClass}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TodoList
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
    </Box>
  );
};
