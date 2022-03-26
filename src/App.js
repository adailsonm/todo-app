import React from 'react';
import { AuthProvider } from './contexts/auth';
import { Routes } from './routes';

export function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
      
    </div>
  );
}

