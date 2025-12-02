// Step4Name.js - MODIFICADO PARA FUNCIONAR AHORA
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddPlant.css';
import { API_BASE_URL } from '../../config';

function Step4Name() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener el deviceId del paso anterior
  const deviceId = location.state?.deviceId || '';
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sensorRegistered, setSensorRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const plantData = {
      name: formData.get('name'),
      species: formData.get('species'),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl')
    };

    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No estás autenticado');

      console.log('📝 Creando nueva planta...', plantData);

      // 1. CREAR LA PLANTA
      const plantResponse = await fetch(`${API_BASE_URL}/api/v1/plants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(plantData)
      });

      if (!plantResponse.ok) {
        const errorText = await plantResponse.text();
        throw new Error(`Error creando planta: ${plantResponse.status} - ${errorText}`);
      }

      const newPlant = await plantResponse.json();
      console.log('✅ Planta creada:', newPlant);

      // 2. REGISTRAR EL SENSOR (SOLO si hay deviceId)
      if (deviceId && deviceId.trim() !== '') {
        console.log(`🔄 Registrando sensor ${deviceId} para planta ${newPlant.id}`);
        
        try {
          const sensorResponse = await fetch(
            `${API_BASE_URL}/api/v1/plants/${newPlant.id}/sensor/register`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ deviceId })
            }
          );

          if (sensorResponse.ok) {
            console.log('✅ Sensor registrado exitosamente');
            setSensorRegistered(true);
            
            // 3. ENVIAR DATOS DE PRUEBA AL SENSOR
            console.log(`📡 Enviando datos de prueba al sensor ${deviceId}...`);
            
            const testData = {
              temp: 22.5,
              hum: 55.8,
              light: 350
            };
            
            const dataResponse = await fetch(
              `${API_BASE_URL}/api/v1/plants/sensor/${deviceId}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(testData)
              }
            );
            
            if (dataResponse.ok) {
              console.log('✅ Datos de prueba enviados:', testData);
              alert('🎉 ¡Planta creada con sensor y datos configurados!');
            }
          } else {
            console.warn('⚠️ Planta creada pero sensor no registrado');
          }
        } catch (sensorError) {
          console.warn('Error registrando sensor:', sensorError);
          // Continuamos aunque falle el sensor
        }
      }

      // 4. NAVEGAR AL HOME
      navigate('/');

    } catch (err) {
      setError(err.message);
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-plant-content">
      <h2>Paso 4: Detalles de la Planta</h2>
      
      <div className="device-id-display">
        <p>
          <strong>Device ID para sensor:</strong> 
          <span className="device-id-value">{deviceId || 'No especificado'}</span>
        </p>
        {deviceId && (
          <small className="device-id-help">
            Este sensor recibirá datos automáticamente: 22.5°C, 55.8% humedad, 350 lux
          </small>
        )}
      </div>
      
      <p>Completa los datos de tu nueva planta:</p>
     
      <form onSubmit={handleSubmit}>
        <div className="form-group-wizard">
          <label htmlFor="name">Nombre de la planta *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="form-input-wizard" 
            required 
            placeholder="Ej: Mi Monstera" 
            disabled={loading}
          />
        </div>

        <div className="form-group-wizard">
          <label htmlFor="species">Especie *</label>
          <input 
            type="text" 
            id="species" 
            name="species" 
            className="form-input-wizard" 
            required 
            placeholder="Ej: Monstera Deliciosa" 
            disabled={loading}
          />
        </div>
       
        <div className="form-group-wizard">
          <label htmlFor="description">Ubicación/Descripción *</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            className="form-input-wizard" 
            required 
            placeholder="Ej: Sala de estar, junto a la ventana" 
            disabled={loading}
          />
        </div>

        <div className="form-group-wizard">
          <label htmlFor="imageUrl">URL de la imagen *</label>
          <input 
            type="text" 
            id="imageUrl" 
            name="imageUrl" 
            className="form-input-wizard" 
            required 
            placeholder="https://ejemplo.com/mi-planta.jpg" 
            disabled={loading}
            defaultValue="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
          />
          <small className="form-help">
            Puedes usar: https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop
          </small>
        </div>

        {error && (
          <div className="error-message">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        {sensorRegistered && (
          <div className="success-message">
            <i className="fa-solid fa-circle-check"></i>
            <span>¡Sensor registrado exitosamente! Enviando datos de prueba...</span>
          </div>
        )}

        <button 
          type="submit" 
          className="add-plant-btn" 
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i> Creando planta...
            </>
          ) : (
            'Crear Planta y Configurar Sensor'
          )}
        </button>
      </form>
    </div>
  );
}

export default Step4Name;