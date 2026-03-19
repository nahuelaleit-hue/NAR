import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Ponemos el código de acceso afuera como una constante
const ACCESS_CODE = "46587949";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputCode === ACCESS_CODE) {
      setIsAuthorized(true);
    } else {
      alert("Código incorrecto");
    }
  };

  if (!isAuthorized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        <h1>NAR - CMA Pro</h1>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            placeholder="Introduce el código de acceso" 
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenido al Analizador Inmobiliario</h1>
      <p>Aquí irá toda tu lógica de CMA Pro que ya tenías armada.</p>
      {/* Pegá aquí abajo el resto de tu lógica si la tenés a mano */}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
