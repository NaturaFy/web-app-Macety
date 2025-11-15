import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext'; // <-- 1. Importa el Proveedor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* --- 2. ¡ENVUELVE TU APP AQUÍ! --- */}
      {/* Esto "enciende" el cerebro del carrito para toda la app */}
      <CartProvider> 
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);