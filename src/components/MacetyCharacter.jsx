import React from 'react';

// Importa los GIFs (asegúrate de que la ruta sea correcta)
import macetySaludando from '../assets/macety_saludando.gif'; 
import macetyOjosTapados from '../assets/macety_ojos_tapados.gif';

const macetyStates = {
  saludando: macetySaludando,
  ojosTapados: macetyOjosTapados,
};

function MacetyCharacter({ state }) {
  const currentImage = macetyStates[state] || macetyStates.saludando;

  return (
    <div className="macety-container">
      <img src={currentImage} alt={`Macety ${state === 'saludando' ? 'saludando' : 'con ojos vendados'}`} className="macety-image" />
      
      
    </div>
  );
}

export default MacetyCharacter;