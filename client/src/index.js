import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { AuthContextProvider } from "./context/AuthContext"
import { TaskContextProvider } from "./context/TaskContext"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);
