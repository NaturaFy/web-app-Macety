import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import defaultAvatar from '../assets/user_avatar.png';
import './Profile.css'; 

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
      } else {
        navigate('/login');
      }
    } catch (e) {
      console.error("Error al leer el usuario del localStorage", e);
      navigate('/login');
    }
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user'); 
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="profile-page">
        <h1 className="profile-title">Cargando perfil...</h1>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1 className="profile-title">Perfil</h1>
      
      {/* --- Bloque de Información de Usuario (ACTUALIZADO) --- */}
      <div className="profile-user-info">
        <img 
          src={user.avatar_url || defaultAvatar} /* <-- Campo nuevo */
          alt={`${user.first_name} ${user.last_name}`} 
          className="profile-avatar" 
        />
        <div className="profile-user-details">
          {/* --- Campo nuevo --- */}
          <h2>{user.first_name} {user.last_name}</h2> 
          {/* --- Campo nuevo --- */}
          <p>{user.location_city || user.email}</p> 
        </div>
      </div>
      
      <h3 className="settings-title">Ajustes</h3>
      
      <ul className="settings-list">
        <li>
          <Link to="/add-plant" className="settings-link">
            <i className="fa-solid fa-plus"></i>
            <span>Añadir maceta MaceTy</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="settings-link">
            <i className="fa-solid fa-bell"></i>
            <span>Notificaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/editar-perfil" className="settings-link">
            <i className="fa-solid fa-pencil"></i> 
            <span>Editar Perfil</span>
          </Link>
        </li>
        <li>
          <Link to="/help" className="settings-link">
            <i className="fa-solid fa-question-circle"></i>
            <span>Ayuda</span>
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="settings-link logout-btn">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Profile;