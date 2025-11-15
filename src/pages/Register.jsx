import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; 

const REGISTER_API_URL = 'http://localhost:8081/api/v1/auth/register';

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [strength, setStrength] = useState({ level: '', text: '' });
  
  const calculateStrength = (password) => {
    let score = 0;
    if (password.length === 0) return { level: '', text: '' };
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: 'weak', text: 'Débil' };
    if (score <= 4) return { level: 'medium', text: 'Media' };
    return { level: 'strong', text: 'Fuerte' };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setStrength(calculateStrength(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value; // <-- ¡NUEVO CAMPO!
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(REGISTER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name, // (Tu backend actual usa 'name', no 'first_name')
          email: email,
          phone_number: phone, // <-- ¡NUEVO CAMPO ENVIADO!
          password: password,
        }),
      });

      const data = await response.json(); 
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la cuenta');
      }

      console.log('Cuenta creada:', data);
      navigate('/login'); 

    } catch (err) {
      setError(err.message);
      console.error('Error en el registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
         <div className="logo">NaturaFy</div>
        <Link to="/register" className="header-button">Crear Cuenta</Link> 
      </header>
      
      <main className="auth-main">
        <Link to="/login" className="auth-back-arrow">←</Link>

        <div className="auth-card">
          <h2>Crear Cuenta</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input 
                type="text" id="name" name="name"
                className="form-input" placeholder="Nombre"
                required disabled={loading}
              />
            </div>
            <div className="form-group">
              <input 
                type="email" id="email" name="email"
                className="form-input" placeholder="Correo electrónico"
                required disabled={loading}
              />
            </div>
            
            {/* --- ¡NUEVO CAMPO DE TELÉFONO! --- */}
            <div className="form-group">
              <input 
                type="tel" id="phone" name="phone"
                className="form-input" placeholder="Número de teléfono"
                required disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <input 
                type="password" id="password" name="password"
                className="form-input" placeholder="Contraseña (min. 8 caracteres)"
                required disabled={loading}
                onChange={handlePasswordChange}
              />
            </div>
            
            {strength.level && (
              <div className="password-strength-meter">
                <div className="strength-bar-track">
                  <div className={`strength-bar ${strength.level}`}></div>
                </div>
                <span className="strength-text">{strength.text}</span>
              </div>
            )}
            
            <div className="form-group">
              <input 
                type="password" id="confirmPassword" name="confirmPassword"
                className="form-input" placeholder="Confirmar contraseña"
                required disabled={loading}
              />
            </div>

            {error && (
              <p className="auth-error-message">{error}</p>
            )}
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>
          
          <div className="auth-card-footer" style={{ justifyContent: 'center' }}>
            <Link to="/login">¿Ya tienes cuenta? <b>Iniciar sesión</b></Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;