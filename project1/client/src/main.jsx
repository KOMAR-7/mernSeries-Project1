import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app.jsx';
import './index.css';
import { AuthProvider } from './store/auth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <AuthProvider>
        <React.StrictMode>
            <App />
            <ToastContainer />
        </React.StrictMode>
    </AuthProvider>,
    document.getElementById('app')
);
