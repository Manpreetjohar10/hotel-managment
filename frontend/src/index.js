import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './styles-new.css';
import './styles-enhanced.css';
import Toasts from './components/Toasts';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<div><App /><Toasts /></div>);
