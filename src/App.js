import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import AuthContextProvider from 'context/AuthContext';
import React from 'react';
import './App.scss';
import Routes from './pages/Routes'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
    <ToastContainer/>
    </>
  );
}

export default App;
