import React from 'react';
import { AuthProvider } from './contexts/auth';

import List from './components/List';
import Form from './components/Form';
import Header from './components/Header';

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

