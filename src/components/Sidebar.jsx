import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import defaultAvatar from '../assets/user_avatar.png'; 

function Sidebar() {
  const [userName, setUserName] = useState('Usuario');
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        // --- ¡ACTUALIZADO! ---
        setUserName(user.first_name || 'Usuario'); // <-- Muestra solo el nombre
        setUserAvatar(user.avatar_url || defaultAvatar); // <-- Campo nuevo
      }
    } catch (e) {
      console.error("Error al leer el usuario del localStorage", e);
    }
  }, []);

  return (
    <nav className="sidebar">
      <div className="sidebar-profile">
        <img src={userAvatar} alt="Avatar" className="sidebar-avatar" />
        <span className="sidebar-username">{userName}</span> {/* <-- Muestra "Sergio" */}
      </div>
      
      <div className="sidebar-links">
        <NavLink to="/" end className="sidebar-link">
          <i className="fa-solid fa-leaf"></i>
          <span>Mis plantas</span>
        </NavLink>
        <NavLink to="/store" className="sidebar-link">
          <i className="fa-solid fa-store"></i>
          <span>Tienda</span>
        </NavLink>
        <NavLink to="/comunidad" className="sidebar-link">
          <i className="fa-solid fa-users"></i>
          <span>Comunidad</span>
        </NavLink>
        
        <div className="sidebar-footer">
          <NavLink to="/profile" className="sidebar-link">
            <i className="fa-solid fa-user"></i>
            <span>Perfil</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;