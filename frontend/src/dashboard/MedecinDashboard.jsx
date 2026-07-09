 

export default function MedecinDashboard() {
  
  // 1. Données pour l'agenda du jour
  const agendaDuJour = [
    { heure: "08:30", patient: "Serigne Samb", type: "Consultation générale", duree: "30 min", statut: "Terminé", classeStatut: "bg-green-50 text-green-700", colorBar: "bg-green-500" },
    { heure: "10:00", patient: "Sira Diaw", type: "Suivi grossesse", duree: "45 min", statut: "En attente", action: true, classeStatut: "bg-amber-100 text-amber-800", colorBar: "bg-amber-500" },
    { heure: "11:00", patient: "Khady Diene", type: "Consultation générale", duree: "30 min", statut: "Nouveau patient", classeStatut: "bg-blue-50 text-blue-600 border border-blue-100", colorBar: "bg-blue-500" },
    { heure: "14:00", patient: "Créneau disponible", type: "Aucun patient programmé", duree: "", statut: "Disponible", classeStatut: "text-gray-400 italic", colorBar: "bg-gray-300" },
    { heure: "15:30", patient: "Abdou Razakh", type: "Bilan de santé", duree: "60 min", statut: "Annulé", classeStatut: "text-red-500 font-medium", colorBar: "bg-red-500" },
  ];

  // 2. Données pour les patients suivis
  const patientsSuivis = [
    { id: "#P-0042", nom: "Sira Diaw", ageSexe: "28 ans / F", derniereVisite: "01 juin 2026", prochainRdv: "23 juin 2026", statut: "Actif", classeBadge: "bg-green-50 text-green-700 border border-green-200" },
    { id: "#P-0044", nom: "Serigne Samb", ageSexe: "51 ans / M", derniereVisite: "02 juin 2026", prochainRdv: "—", statut: "Nouveau", classeBadge: "bg-blue-50 text-blue-700 border border-blue-200" },
    { id: "#P-0046", nom: "Khady Diene", ageSexe: "34 ans / F", derniereVisite: "02 juin 2026", prochainRdv: "—", statut: "En attente", classeBadge: "bg-amber-50 text-amber-700 border border-amber-200" },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête contenu: nom + date */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bonjour, Dr. Aminata Diallo</h2>
          <p className="text-sm text-gray-500">Lundi 2 juin 2026 · Centre de Santé Thiès-Nord</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 text-sm px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50">🔍 Rechercher</button>
          <div className="w-10 h-10 bg-santeActive text-white rounded-full flex items-center justify-center font-bold">AD</div>
        </div>
      </div>

      {/* ─── BLOCS DES STATISTIQUES SUPÉRIEURES ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Mes RDV aujourd'hui */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Mes RDV aujourd'hui</p>
            <p className="text-3xl font-extrabold text-gray-900 my-1">6</p>
            <p className="text-sm text-gray-400">2 terminés · 4 restants</p>
          </div>
        </div>

        {/* Patients en salle d'attente */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Patients en salle d'attente</p>
            <p className="text-3xl font-extrabold text-amber-600 my-1">2</p>
            <p className="text-sm text-gray-400">Temps d'attente moy. 12 min</p>
          </div>
        </div>

        {/* Dossiers à compléter */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Dossiers à compléter</p>
            <p className="text-3xl font-extrabold text-gray-900 my-1">3</p>
            <p className="text-sm text-gray-400">Consultations sans compte-rendu</p>
          </div>
        </div>

        {/* RDV annulés */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">RDV annulés</p>
            <p className="text-3xl font-extrabold text-red-500 my-1">1</p>
            <p className="text-sm text-gray-400">À reprogrammer</p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 1 : MON AGENDA DU JOUR ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-gray-900">Mon agenda du jour</h3>
          <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-100">Aujourd'hui</span>
        </div>

        <div className="divide-y divide-gray-100">
          {agendaDuJour.map((creneau, idx) => (
            <div key={idx} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className={`w-1 h-12 rounded ${creneau.colorBar}`}></div>
                <span className="text-sm font-bold text-gray-700 w-12">{creneau.heure}</span>
                <div>
                  <p className={`text-sm font-semibold ${creneau.heure === "14:00" ? "text-gray-400 italic" : "text-gray-900"}`}>
                    {creneau.patient}
                  </p>
                  <p className="text-xs text-gray-500">
                    {creneau.type} {creneau.duree && `· ${creneau.duree}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${creneau.classeStatut}`}>
                  {creneau.statut}
                </span>
                {creneau.action && (
                  <button className="bg-santeActive hover:bg-[#006a57] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                    Démarrer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 2 : ALERTES & RAPPELS ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-gray-900 mb-1">Alertes & rappels</h3>
        
        {/* Alerte 1 */}
        <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3.5 flex flex-col justify-center">
          <p className="text-sm font-bold text-amber-900">Dossier incomplet</p>
          <p className="text-xs text-amber-700 mt-0.5">Sira Diaw · compte-rendu du 10 mai non finalisé</p>
        </div>

        {/* Alerte 2 */}
        <div className="bg-green-50/50 border border-green-100 rounded-xl p-3.5 flex flex-col justify-center">
          <p className="text-sm font-bold text-green-900">Résultats reçus</p>
          <p className="text-xs text-green-700 mt-0.5">Khady Diene · analyses biochimiques disponibles</p>
        </div>

        {/* Alerte 3 */}
        <div className="bg-red-50/50 border border-red-100 rounded-xl p-3.5 flex flex-col justify-center">
          <p className="text-sm font-bold text-red-900">Allergie à vérifier</p>
          <p className="text-xs text-red-700 mt-0.5">Serigne Samb · pénicilline signalée au dossier</p>
        </div>

        {/* Boutons d'actions rapides bas d'alertes */}
        <div className="flex gap-3 pt-2">
          <button className="bg-santeActive hover:bg-[#006a57] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm">
            + Nouvelle consultation
          </button>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Voir mon agenda
          </button>
        </div>
      </div>

      {/* ─── SECTION 3 : MES PATIENTS SUIVIS ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-gray-900">Mes patients suivis</h3>
          <button className="text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            Voir tous mes patients
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 font-semibold">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Âge / Sexe</th>
                <th className="pb-3 font-medium">Dernière visite</th>
                <th className="pb-3 font-medium">Prochain RDV</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {patientsSuivis.map((p, index) => (
                <tr key={index} className="hover:bg-gray-50/40 transition-colors">
                  <td className="py-3.5 font-semibold text-gray-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-santeActive/10 text-santeActive flex items-center justify-center text-xs font-bold">
                        {p.nom.split(' ').map(n => n[0]).join('')}
                      </div>
                      {p.nom}
                    </div>
                  </td>
                  <td className="py-3.5 text-xs text-gray-400 font-mono">{p.id}</td>
                  <td className="py-3.5 text-gray-600">{p.ageSexe}</td>
                  <td className="py-3.5 text-gray-500">{p.derniereVisite}</td>
                  <td className="py-3.5 text-gray-500">{p.prochainRdv}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.classeBadge}`}>
                      {p.statut}
                    </span>
                  </td>
                  <td className="py-3.5 text-right font-semibold text-santeActive hover:text-santeDark cursor-pointer transition-colors text-xs">
                    Ouvrir dossier →
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}