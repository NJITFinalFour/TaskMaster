import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'
import App from './App';
import { AuthContextProvider } from "./hooks/AuthContext"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
      <App />
  </AuthContextProvider>
);
