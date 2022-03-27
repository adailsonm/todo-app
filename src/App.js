import React from 'react';
import { AuthProvider } from './contexts/auth';
import { Routes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ToastContainer/>
        <Routes />
      </AuthProvider>
      
    </div>
  );
}

