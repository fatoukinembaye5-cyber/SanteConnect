// src/components/MaquetteLayout.jsx

const MaquetteLayout = ({ children, num, title, desc, url }) => {
  return (
    <div className="min-h-screen bg-[#FSF4EF] flex flex-col font-sans antialiased text-[#1E2421]">
      
      {/* 🟢 LA BARRE DE NAVIGATION SUPÉRIEURE (Couleur #033A2F) */}
      <nav className="bg-[#033A2F] text-white px-8 py-4 flex items-center justify-between shadow-md select-none w-full">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 mr-4">
            <div className="w-3 h-3 bg-[#1CB472] rounded-full"></div>
            <span className="font-bold text-sm tracking-wide">SantéConnect</span>
          </div>
          
          <div className="flex items-center space-x-4 text-xs font-medium opacity-90">
            <span className="px-3 py-1.5 rounded bg-[#0A5C47] text-[#DDF3EC] border border-emerald-700/30">Connexion</span>
            <span className="opacity-40 cursor-not-allowed">Tableau de bord</span>
            <span className="opacity-40 cursor-not-allowed">Rendez-vous</span>
            <span className="opacity-40 cursor-not-allowed">Patients</span>
            <span className="opacity-40 cursor-not-allowed">Design System</span>
          </div>
        </div>
        <div className="text-[10px] tracking-wider text-[#1CB472] uppercase font-bold">Exposition Maquette</div>
      </nav>

      {/* ⚪ LE BANDEAU GRIS DE PRÉSENTATION DYNAMIQUE */}
      <div className="bg-[#EBEBEB] px-12 py-5 border-b border-[#D9D9D9] shadow-sm text-left w-full">
        <div className="flex items-center space-x-2 text-[#033A2F] font-bold">
          <span className="bg-[#0A5C47] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono">
            {num}
          </span>
          <h2 className="text-sm tracking-wide">{title}</h2>
        </div>
        <p className="text-xs text-gray-500 ml-7 mt-0.5 font-normal">
          {desc}
        </p>
        
        {/* Fausse barre d'adresse Mac */}
        <div className="flex items-center space-x-1.5 mt-3 ml-7">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="bg-white text-[10px] text-gray-400 px-4 py-1 rounded-full w-80 border border-[#D9D9D9]/50 shadow-inner ml-2 font-mono">
            {url}
          </div>
        </div>
      </div>

      {/* ZONE DE CONTENU POUR TON FORMULAIRE */}
      <div className="flex-1 w-full overflow-y-auto">
        {children}
      </div>

    </div>
  );
};

export default MaquetteLayout;