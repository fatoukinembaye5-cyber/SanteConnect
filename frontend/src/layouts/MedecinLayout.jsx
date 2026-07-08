import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

export default function MedecinLayout() {
  // États pour la recherche et les notifications
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      alert(`Recherche en cours pour : "${searchQuery}"`);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", backgroundColor: "#fcfdfd" }}>
      
      {/* ─── BARRE LATÉRALE DE NAVIGATION (SIDEBAR) ─── */}
      <aside style={{ width: "260px", backgroundColor: "#111c24", color: "#fff", padding: "20px", display: "flex", flexDirection: "column" }}>
        {/* Logo SantéConnect */}
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#2ecc71", marginBottom: "45px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "inline-block", width: "10px", height: "10px", backgroundColor: "#2ecc71", borderRadius: "50%" }}></span>
          SantéConnect
        </div>
        
        {/* Menu de navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          <span style={{ color: "#5a6a75", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Navigation</span>
          
          <NavLink 
            to="/medecin/tableau-de-board" 
            style={({ isActive }) => ({
              padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "14px",
              backgroundColor: isActive ? "#0e7052" : "transparent", display: "block"
            })}
          >
            📊 Mon tableau de bord
          </NavLink>

          <NavLink 
            to="/medecin/mon-agenda" 
            style={({ isActive }) => ({
              padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "14px",
              backgroundColor: isActive ? "#0e7052" : "transparent", display: "block"
            })}
          >
            🗓️ Mon agenda
          </NavLink>

          <NavLink 
            to="/medecin/mes-patients" 
            style={({ isActive }) => ({
              padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "14px",
              backgroundColor: isActive ? "#0e7052" : "transparent", display: "block"
            })}
          >
            👥 Mes patients
          </NavLink>

          <NavLink 
            to="/medecin/dossiers-medicaux" 
            style={({ isActive }) => ({
              padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "14px",
              backgroundColor: isActive ? "#0e7052" : "transparent", display: "block"
            })}
          >
            📁 Dossiers médicaux
          </NavLink>

          <NavLink 
            to="/medecin/ordonnances" 
            style={({ isActive }) => ({
              padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "14px",
              backgroundColor: isActive ? "#0e7052" : "transparent", display: "block"
            })}
          >
            📄 Ordonnances
          </NavLink>

          <NavLink 
            to="/medecin/messages" 
            style={({ isActive }) => ({
              padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "14px",
              backgroundColor: isActive ? "#0e7052" : "transparent", display: "flex", justifyContent: "space-between", alignItems: "center"
            })}
          >
            <span>💬 Messages</span>
            <span style={{ backgroundColor: "#e74c3c", color: "#fff", borderRadius: "10px", padding: "2px 8px", fontSize: "11px", fontWeight: "bold" }}>2</span>
          </NavLink>
        </nav>
      </aside>

      {/* ─── ZONE DE DROITE (HEADER + PAGES DYNAMIQUES) ─── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* BARRE SUPÉRIEURE (HEADER) */}
        <header style={{ height: "75px", backgroundColor: "#fff", borderBottom: "1px solid #edf2f7", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 35px" }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 4px 0", color: "#2d3748" }}>Bonjour, Dr. Aminata Diallo</h1>
            <small style={{ color: "#a0aec0", fontSize: "13px" }}>Centre de Santé Thiès-Nord</small>
          </div>

          {/* Outils interactifs (Recherche, Cloche, Profil) */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
            
            {/* Barre de Recherche fonctionnelle */}
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", backgroundColor: "#f7fafc", borderRadius: "20px", padding: "4px 12px", border: "1px solid #e2e8f0" }}>
              <input 
                type="text" 
                placeholder="Rechercher un patient, dossier..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: "none", background: "transparent", outline: "none", padding: "6px", fontSize: "14px" }}
              />
              <button type="submit" style={{ background: "transparent", border: "none", cursor: "pointer" }}>🔍</button>
            </form>

            {/* Bouton Notification */}
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{ background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontSize: "16px", position: "relative" }}
            >
              🔔
              <span style={{ position: "absolute", top: "8px", right: "10px", width: "8px", height: "8px", backgroundColor: "#e74c3c", borderRadius: "50%" }}></span>
            </button>

            {/* Bulle Menu Déroulant des Notifications */}
            {notificationsOpen && (
              <div style={{ position: "absolute", top: "55px", right: "60px", width: "260px", backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "15px", zIndex: 10 }}>
                <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", borderBottom: "1px solid #edf2f7", paddingBottom: "5px" }}>Notifications</h4>
                <p style={{ margin: 0, fontSize: "12px", color: "#4a5568" }}>📬 Vous avez 2 nouveaux messages non lus.</p>
              </div>
            )}

            {/* Avatar Médecin */}
            <div style={{ width: "42px", height: "42px", backgroundColor: "#2ecc71", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              AD
            </div>
          </div>
        </header>

        {/* ─── EMPLACEMENT DE CONTENU DYNAMIQUE ─── */}
        <main style={{ flex: 1, backgroundColor: "#ffffff" }}>
          {/* L'Outlet affiche automatiquement la page demandée au clic */}
          <Outlet />
        </main>
        
      </div>

    </div>
  );
}
