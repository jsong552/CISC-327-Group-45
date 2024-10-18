import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import App from './App';
import Sidebar from './components/sidebar.tsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
    <App />
    <Sidebar/>
    </div>
);
