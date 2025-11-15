import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // Importamos el nuevo componente Sidebar

function Layout({ children }) {
  const location = useLocation();

  // Comprueba si estamos en una ruta de "pantalla completa"
  const isFullPage = 
    ['/login', '/register'].includes(location.pathname) || 
    location.pathname.startsWith('/add-plant');

  // Si es una ruta de pantalla completa, no muestra la barra lateral
  if (isFullPage) {
    // Renderiza solo el contenido (Login, Register, AddPlant)
    return <main className="main-content-full">{children}</main>;
  }

  // Si NO es pantalla completa, muestra el layout con barra lateral
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content-area">
        {children}
      </main>
    </div>
  );
}

export default Layout;