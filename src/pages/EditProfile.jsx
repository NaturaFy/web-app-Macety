import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css'; 

const PROFILE_API_URL = 'http://localhost:8081/api/v1/profile';

function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para user_profiles
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // <-- ¡NUEVO CAMPO!
  const [locationCity, setLocationCity] = useState('');
  const [locationDistrict, setLocationDistrict] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Estados para user_preferences
  const [language, setLanguage] = useState('es');
  const [theme, setTheme] = useState('claro');
  const [notifications, setNotifications] = useState(true);

  // 1. Cargar datos del usuario al iniciar
  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        
        setFirstName(user.first_name || '');
        setLastName(user.last_name || '');
        setPhoneNumber(user.phone_number || ''); // <-- ¡NUEVO CAMPO!
        setLocationCity(user.location_city || '');
        setLocationDistrict(user.location_district || '');
        setAvatarUrl(user.avatar_url || '');

        setLanguage(user.preferences?.language || 'es');
        setTheme(user.preferences?.theme || 'claro');
        setNotifications(user.preferences?.notification_enabled ?? true);

      } else {
        navigate('/login');
      }
    } catch (e) {
      console.error("Error al leer el usuario", e);
      navigate('/login');
    }
  }, [navigate]);

  // 2. Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No estás autenticado.');
      }

      // 3. Enviar datos con PUT
      const response = await fetch(PROFILE_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber, // <-- ¡NUEVO CAMPO ENVIADO!
          location_city: locationCity,
          location_district: locationDistrict,
          avatar_url: avatarUrl,
          preferences: {
            language: language,
            theme: theme,
            notification_enabled: notifications
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar');
      }

      localStorage.setItem('user', JSON.stringify(data));
      navigate('/profile');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <h1>Editar Perfil</h1>
      <p>Actualiza tu información personal y preferencias.</p>

      <form className="profile-form" onSubmit={handleSubmit}>
        
        <h3 className="form-section-title">Información Personal</h3>
        
        <div className="form-group">
          <label htmlFor="first_name">Nombre</label>
          <input 
            type="text" id="first_name" className="form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Apellido</label>
          <input 
            type="text" id="last_name" className="form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        {/* --- ¡NUEVO CAMPO DE TELÉFONO! --- */}
        <div className="form-group">
          <label htmlFor="phone_number">Número de Teléfono</label>
          <input 
            type="tel" id="phone_number" className="form-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Ej: +51 987654321"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location_city">Ciudad</label>
          <input 
            type="text" id="location_city" className="form-input"
            value={locationCity}
            onChange={(e) => setLocationCity(e.target.value)}
            placeholder="Ej: Lima"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location_district">Distrito</label>
          <input 
            type="text" id="location_district" className="form-input"
            value={locationDistrict}
            onChange={(e) => setLocationDistrict(e.target.value)}
            placeholder="Ej: Comas"
          />
        </div>

        <div className="form-group">
          <label htmlFor="avatar_url">URL de Avatar</label>
          <input 
            type="text" id="avatar_url" className="form-input"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.png"
          />
        </div>

        <h3 className="form-section-title">Preferencias</h3>

        <div className="form-group">
          <label htmlFor="language">Idioma</label>
          <select 
            id="language" 
            className="form-input" 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="theme">Tema</label>
          <select 
            id="theme" 
            className="form-input"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
          </select>
        </div>

        <div className="form-group-checkbox">
          <input 
            type="checkbox" 
            id="notifications" 
            className="form-checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          <label htmlFor="notifications">Habilitar notificaciones</label>
        </div>

        {error && (
          <p className="auth-error-message">{error}</p>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;