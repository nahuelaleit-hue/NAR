import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Building2, Search, ClipboardList, TrendingUp } from 'lucide-react';

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  const ACCESS_CODE = "46587949";

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputCode === ACCESS_CODE) setIsAuthorized(true);
    else alert("Código incorrecto");
  };

  const handleAnalyze = async () => {
    if (!pasteText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1500,
          messages: [{ role: "user", content: `Analizá estos comparables y hacé un reporte de tasación: ${pasteText}` }]
        })
      });
      const data = await res.json();
      setReport(data.content[0].text);
    } catch (e) {
      alert("Error al conectar con la IA");
    }
    setLoading(false);
  };

  if (!isAuthorized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc' }}>
        <div style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <Building2 size={48} style={{ color: '#2563eb', margin: '0 auto 20px' }} />
          <h1 style={{ marginBottom: '20px', color: '#1e293b' }}>NAR - CMA Pro</h1>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Código de acceso" 
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              style={{ padding: '12px', width: '250px', borderRadius: '6px', border: '1px solid #cbd5e0', marginBottom: '15px', display: 'block' }}
            />
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px' }}>
        <TrendingUp size={32} color="#2563eb" />
        <h1 style={{ fontSize: '24px', color: '#1e293b' }}>Analizador de Mercado Inmobiliario</h1>
      </header>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>Pegá aquí los datos de las propiedades (Texto libre):</label>
        <textarea 
          style={{ width: '100%', height: '200px', padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '16px' }}
          placeholder="Ejemplo: Casa en Ramos Mejia, 3 ambientes, 2 baños, USD 150.000..."
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
        />
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          style={{ marginTop: '15px', padding: '12px 30px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? "Analizando con IA..." : "Generar Reporte de Tasación"}
        </button>
      </div>

      {report && (
        <div style={{ background: '#f1f5f9', padding: '25px', borderRadius: '10px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
          <h2 style={{ marginTop: 0 }}>Reporte Generado:</h2>
          {report}
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
