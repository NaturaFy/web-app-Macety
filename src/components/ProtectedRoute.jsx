import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // 1. Revisa si tenemos el token guardado en el localStorage
  const token = localStorage.getItem('access_token');
  const location = useLocation();

  if (!token) {
    // 2. Si NO hay token, redirige al usuario al login
    // 'replace' evita que pueda usar el botón de "atrás" del navegador
    // 'state' guarda la página a la que quería ir (para redirigirlo allí después del login)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Si SÍ hay token, muestra el componente que el usuario pidió (Home, Profile, etc.)
  return children;
}

export default ProtectedRoute;