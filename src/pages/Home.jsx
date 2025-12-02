import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantCard from '../components/PlantCard';
import RecentActivity from '../components/RecentActivity';
import './Home.css';
import { API_BASE_URL } from '../config';

const mockActivities = [
  { id: 1, text: 'Ficus fue regada con 77ml', timestamp: '3/10/2025 10:21 p.m.' },
];

function Home() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario
    const userString = localStorage.getItem('user');
    if (userString) {
        try {
            const user = JSON.parse(userString);
            setUserName(user.first_name || user.name);
        } catch(e) { console.error("Error parsing user", e); }
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        if (!token) { navigate('/login'); return; }

        // 1. Obtener lista de plantas
        const plantsResponse = await fetch(`${API_BASE_URL}/api/v1/plants`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (plantsResponse.status === 401) { localStorage.clear(); navigate('/login'); return; }
        
        const plantsData = await plantsResponse.json();

        // 2. Obtener DATOS DE SENSORES (en paralelo para cada planta)
        const plantsWithSensors = await Promise.all(
          plantsData.map(async (plant) => {
            try {
              // Llamada al endpoint: /api/v1/plants/{id}/sensor/latest
              const sensorRes = await fetch(`${API_BASE_URL}/api/v1/plants/${plant.id}/sensor/latest`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              if (sensorRes.ok) {
                const sensorData = await sensorRes.json();
                // Inyectamos los datos del sensor dentro del objeto planta
                return { ...plant, sensorData }; 
              }
              return plant; // Si no hay sensor, devolvemos la planta normal
            } catch (e) {
              console.error(`Error sensor planta ${plant.id}`, e);
              return plant;
            }
          })
        );

        setPlants(plantsWithSensors);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <div className="home-dashboard"><div className="dashboard-message"><p>Cargando tu jardín...</p></div></div>;

  return (
    <div className="home-dashboard">
      <div className="dashboard-header">
        <h1>El Jardín de {userName || 'Usuario'}</h1>
        <p>{plants.length} {plants.length === 1 ? 'planta monitoreada' : 'plantas monitoreadas'}</p>
      </div>
      
      {plants.length === 0 ? (
        <div className="empty-state-card">
           <i className="fa-solid fa-seedling empty-icon"></i>
           <h3>¡Tu jardín está vacío!</h3>
           <p>Añade una planta para comenzar.</p>
        </div>
      ) : (
        <div className="plant-grid">
          {plants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      
    </div>
  );
}

export default Home;