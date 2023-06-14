import React, { useEffect } from 'react';
import './App.css';

import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { selectIsInitialized } from './app.selector';
import { ErrorSnackbar } from '../common/components';
import { appThunks } from './app.slice';
import { useActions } from '../common/hooks';
import { Header } from './Header/Header';
import { Routing } from './Routing/Routing';

const App = () => {
  const isInitialized = useSelector(selectIsInitialized);
  const { initializeApp } = useActions(appThunks);

  useEffect(() => {
    initializeApp({});
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', width: '100%', textAlign: 'center', top: '30%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div>
        <Routing />
      </div>
      <ErrorSnackbar />
    </div>
  );
};

export default App;
