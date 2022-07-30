import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import AuthContextProvider from 'context/AuthContext';
import React,{useContext} from 'react';
import './App.scss';
import Routes from './pages/Routes'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {AuthContext} from 'context/AuthContext'

function App() {
  // const {loader} =useContext(AuthContext)
  // console.log(loader);
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
