import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

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
    <div className="flex min-h-screen font-sans bg-santeBg text-gray-800">
      
      {/* ─── BARRE LATÉRALE DE NAVIGATION (SIDEBAR) ─── */}
      <aside className="w-[260px] bg-santeDark text-gray-300 p-5 flex flex-col justify-between min-h-screen fixed left-0 top-0 z-20">
        <div>
          {/* Logo SantéConnect */}
          <div className="text-[20px] font-bold text-white mb-[45px] flex items-center gap-2 px-1">
            <span className="inline-block w-2.5 h-2.5 bg-santeTextVif rounded-full"></span>
            Santé<span className="text-santeTextVif">Connect</span>
          </div>
          
          {/* Menu de navigation */}
          <nav className="flex flex-col gap-1">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-[1px] mb-3 px-1">
              Navigation
            </span>
            
            <NavLink 
              to="/medecin/tableau-de-board" 
              className={({ isActive }) => 
                `px-4 py-3 text-white no-underline rounded-lg text-[14px] block transition-all duration-150 ${
                  isActive ? "bg-santeActive font-semibold shadow-md" : "text-gray-300 hover:bg-[#002d26] hover:text-white"
                }`
              }
            >
              📊 Mon tableau de bord
            </NavLink>

            <NavLink 
              to="/medecin/mon-agenda" 
              className={({ isActive }) => 
                `px-4 py-3 text-white no-underline rounded-lg text-[14px] block transition-all duration-150 ${
                  isActive ? "bg-santeActive font-semibold shadow-md" : "text-gray-300 hover:bg-[#002d26] hover:text-white"
                }`
              }
            >
              🗓️ Mon agenda
            </NavLink>

            <NavLink 
              to="/medecin/mes-patients" 
              className={({ isActive }) => 
                `px-4 py-3 text-white no-underline rounded-lg text-[14px] block transition-all duration-150 ${
                  isActive ? "bg-santeActive font-semibold shadow-md" : "text-gray-300 hover:bg-[#002d26] hover:text-white"
                }`
              }
            >
              👥 Mes patients
            </NavLink>

            <NavLink 
              to="/medecin/dossiers-medicaux" 
              className={({ isActive }) => 
                `px-4 py-3 text-white no-underline rounded-lg text-[14px] block transition-all duration-150 ${
                  isActive ? "bg-santeActive font-semibold shadow-md" : "text-gray-300 hover:bg-[#002d26] hover:text-white"
                }`
              }
            >
              📁 Dossiers médicaux
            </NavLink>

            <NavLink 
              to="/medecin/ordonnances" 
              className={({ isActive }) => 
                `px-4 py-3 text-white no-underline rounded-lg text-[14px] block transition-all duration-150 ${
                  isActive ? "bg-santeActive font-semibold shadow-md" : "text-gray-300 hover:bg-[#002d26] hover:text-white"
                }`
              }
            >
              📄 Ordonnances
            </NavLink>

            <NavLink 
              to="/medecin/messages" 
              className={({ isActive }) => 
                `px-4 py-3 text-white no-underline rounded-lg text-[14px] flex justify-between items-center transition-all duration-150 ${
                  isActive ? "bg-santeActive font-semibold shadow-md" : "text-gray-300 hover:bg-[#002d26] hover:text-white"
                }`
              }
            >
              <span>💬 Messages</span>
              <span className="bg-[#e74c3c] text-white rounded-full px-2 py-0.5 text-[11px] font-bold">2</span>
            </NavLink>
          </nav>
        </div>

        {/* Section Profil en bas de la barre latérale */}
        <div className="border-t border-[#002d26] pt-4 mt-auto">
          <div className="flex items-center gap-3 px-1 mb-3">
            <div className="w-9 h-9 rounded-full bg-santeActive flex items-center justify-center text-white font-bold text-xs shadow-inner">
              AD
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">Dr. Aminata Diallo</p>
              <p className="text-[11px] text-gray-400">Médecine générale</p>
            </div>
          </div>
          <button className="w-full text-left px-1 py-1 text-[11px] text-gray-400 hover:text-white transition-colors">
            Paramètres
          </button>
          <button className="w-full text-left px-1 py-1 text-[11px] text-red-400 hover:text-red-300 transition-colors">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ─── ZONE DE DROITE (HEADER + PAGES DYNAMIQUES) ─── */}
      <div className="flex-1 flex flex-col pl-[260px]">
        
        {/* BARRE SUPÉRIEURE (HEADER) */}
        <header className="h-[75px] bg-white border-b border-[#edf2f7] flex items-center justify-between px-[35px] sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-[20px] font-semibold m-0 text-[#2d3748]">Bonjour, Dr. Aminata Diallo</h1>
            <small className="text-[#a0aec0] text-[13px]">Centre de Santé Thiès-Nord</small>
          </div>

          {/* Outils interactifs (Recherche, Cloche, Profil) */}
          <div className="flex items-center gap-5 relative">
            
            {/* Barre de Recherche */}
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#f7fafc] rounded-full px-3 py-1 border border-[#e2e8f0]">
              <input 
                type="text" 
                placeholder="Rechercher un patient, dossier..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-transparent outline-none p-1.5 text-[14px]"
              />
              <button type="submit" className="bg-transparent border-none cursor-pointer">🔍</button>
            </form>

            {/* Bouton Notification */}
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="bg-[#f7fafc] border border-[#e2e8f0] rounded-full w-10 h-10 cursor-pointer text-[16px] relative flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              🔔
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#e74c3c] rounded-full"></span>
            </button>

            {/* Menu Déroulant des Notifications */}
            {notificationsOpen && (
              <div className="absolute top-[55px] right-[60px] w-[260px] bg-white border border-[#e2e8f0] rounded-lg shadow-lg p-[15px] z-30">
                <h4 className="m-0 text-[14px] border-b border-[#edf2f7] pb-1 mb-2 font-semibold">Notifications</h4>
                <p className="m-0 text-[12px] text-[#4a5568]">📬 Vous avez 2 nouveaux messages non lus.</p>
              </div>
            )}

            {/* Avatar Médecin */}
            <div className="w-[42px] h-[42px] bg-santeActive text-white rounded-full flex items-center justify-center font-bold shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* ─── EMPLACEMENT DE CONTENU DYNAMIQUE ─── */}
        <main className="flex-1 p-8">
          {/* Conteneur principal blanc qui accueille les pages intérieures */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[calc(100vh-140px)]">
            <Outlet />
          </div>
        </main>
        
      </div>

    </div>
  );
}