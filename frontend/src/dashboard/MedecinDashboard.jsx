import { Link } from "react-router-dom";

const stats = [
  { label: "Mes RDV aujourd'hui", value: 6, sub: "2 terminés · 4 restants", color: "text-gray-900" },
  { label: "Patients en salle d'attente", value: 2, sub: "Temps d'attente moy. 12 min", color: "text-orange-500" },
  { label: "Dossiers à compléter", value: 3, sub: "Consultations sans compte-rendu", color: "text-gray-900" },
  { label: "RDV annulés", value: 1, sub: "À reprogrammer", color: "text-red-500" },
];

const agenda = [
  { time: "08:30", name: "Serigne Samb", type: "Consultation générale · 30 min", status: "Terminé", statusColor: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" },
  { time: "10:00", name: "Sira Diaw", type: "Suivi grossesse · 45 min", status: "En attente", statusColor: "bg-amber-100 text-amber-700", bar: "bg-amber-400", extra: "Démarrer" },
  { time: "11:00", name: "Khady Diene", type: "Consultation générale · 30 min", status: "Nouveau patient", statusColor: "bg-blue-100 text-blue-700", bar: "bg-blue-500" },
  { time: "14:00", name: "Créneau disponible", type: "Aucun patient programmé", status: null, bar: "bg-gray-300" },
  { time: "15:30", name: "Abdou Razakh", type: "Bilan de santé · 60 min", status: "Annulé", statusColor: "bg-red-100 text-red-600", bar: "bg-gray-300" },
];

const alerts = [
  { title: "Dossier incomplet", text: "Sira Diaw · compte-rendu du 10 mai non finalisé", color: "bg-amber-50 border-amber-200 text-amber-800" },
  { title: "Résultats reçus", text: "Khady Diene · analyses biochimiques disponibles", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
  { title: "Allergie à vérifier", text: "Serigne Samb · pénicilline signalée au dossier", color: "bg-red-50 border-red-200 text-red-800" },
];

const patients = [
  { initials: "SD", name: "Sira Diaw", id: "#P-0042", age: "28 ans / F", last: "01 juin 2026", next: "23 juin 2026", status: "Actif", statusColor: "bg-emerald-100 text-emerald-700" },
  { initials: "SS", name: "Serigne Samb", id: "#P-0044", age: "51 ans / M", last: "02 juin 2026", next: "—", status: "Nouveau", statusColor: "bg-blue-100 text-blue-700" },
  { initials: "KD", name: "Khady Diene", id: "#P-0046", age: "34 ans / F", last: "02 juin 2026", next: "—", status: "En attente", statusColor: "bg-amber-100 text-amber-700" },
];

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default function MedecinDashboard() {
  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="flex flex-col gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-sm text-gray-500 mb-2">{s.label}</p>
            <p className={`text-3xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Agenda */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Mon agenda du jour</h2>
          <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">Aujourd'hui</span>
        </div>
        <div className="space-y-3">
          {agenda.map((a) => (
            <div key={a.time} className="flex items-center gap-4">
              <span className={`w-1 h-10 rounded ${a.bar}`} />
              <span className="text-sm text-gray-500 w-12">{a.time}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{a.name}</p>
                <p className="text-xs text-gray-400">{a.type}</p>
              </div>
              {a.status && (
                <span className={`text-xs px-2 py-1 rounded-full ${a.statusColor}`}>
                  {a.status}
                </span>
              )}
              {a.extra && (
                <Link to="/medecin/nouvelle-consultation">
                  <button className="text-xs bg-emerald-700 text-white px-3 py-1.5 rounded-md hover:bg-emerald-800 transition-colors">
                    {a.extra}
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Alerts */}
      <Card className="p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Alertes &amp; rappels</h2>
        <div className="space-y-2 mb-4">
          {alerts.map((al) => (
            <div key={al.title} className={`border rounded-lg px-4 py-3 ${al.color}`}>
              <p className="text-sm font-medium">{al.title}</p>
              <p className="text-xs opacity-80">{al.text}</p>
            </div>
          ))}
        </div>
        
        {/* 🔴 CORRECTION DES DEUX BOUTONS ICI 🔴 */}
        <div className="flex gap-3">
          <Link to="/medecin/nouvelle-consultation" style={{ textDecoration: 'none' }}>
            <button className="bg-emerald-700 text-white text-sm px-4 py-2 rounded-md hover:bg-emerald-800 transition-colors">
              + Nouvelle consultation
            </button>
          </Link>
          
          <Link to="/medecin/mon-agenda" style={{ textDecoration: 'none' }}>
            <button className="border text-sm px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Voir mon agenda
            </button>
          </Link>
        </div>
      </Card>

      {/* Patients table */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Mes patients suivis</h2>
          <Link to="/medecin/mes-patients" className="text-sm text-emerald-700 font-medium hover:underline">
            Voir tous mes patients
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs border-b">
              <th className="pb-2 font-normal">Patient</th>
              <th className="pb-2 font-normal">ID</th>
              <th className="pb-2 font-normal">Âge / Sexe</th>
              <th className="pb-2 font-normal">Dernière visite</th>
              <th className="pb-2 font-normal">Prochain RDV</th>
              <th className="pb-2 font-normal">Statut</th>
              <th className="pb-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="py-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                    {p.initials}
                  </span>
                  {p.name}
                </td>
                <td className="text-gray-500">{p.id}</td>
                <td className="text-gray-500">{p.age}</td>
                <td className="text-gray-500">{p.last}</td>
                <td className="text-gray-500">{p.next}</td>
                <td>
                  <span className={`text-xs px-2 py-1 rounded-full ${p.statusColor}`}>
                    {p.status}
                  </span>
                </td>
                <td className="text-right">
                  <Link to="/medecin/dossiers-medicaux" className="text-emerald-700 text-sm font-medium hover:underline">
                    Ouvrir dossier →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
