import React, { useState } from 'react';

export default function Medecins() {
  // Données de l'équipe médicale basées sur la maquette
  const [medecinsList] = useState([
    { id: "M-001", nom: "Dr. Aminata Diallo", specialite: "Médecine générale", statut: "Disponible", consultations: 12 },
    { id: "M-002", nom: "Dr. Serigne Samb", specialite: "Consultation générale", statut: "En consultation", consultations: 8 },
    { id: "M-003", nom: "Dr. Sira Diaw", specialite: "Suivi grossesse / Gynécologie", statut: "Disponible", consultations: 14 },
    { id: "M-004", nom: "Dr. Khady Diene", specialite: "Pédiatrie", statut: "En pause", consultations: 9 },
    { id: "M-005", nom: "Dr. Abdou Razakh", specialite: "Bilan de santé / Cardiologie", statut: "Disponible", consultations: 11 }
  ]);

  return (
    <div className="space-y-6">
      
      {/* 1. SECTION TITRE */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Médecins</h2>
        <p className="text-sm text-gray-500">Suivi des médecins de l'établissement et de leurs spécialités.</p>
      </div>

      {/* 2. BLOC D'INFORMATION GLOBAL (ÉQUIPE MÉDICALE) */}
      <div className="bg-[#fcfdfd] border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#003B32] mb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-santeActive inline-block"></span>
          Équipe médicale du Centre
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Gestion des disponibilités, des plannings de consultations et des services médicaux actifs.
        </p>

        {/* 3. TABLEAU DES MÉDECINS (STYLE MAQUETTE) */}
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Médecin</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Spécialité / Service</th>
                <th className="px-6 py-4">Consultations (Auj.)</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {medecinsList.map((medecin) => (
                <tr key={medecin.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Profil / Nom */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#008A74]/10 text-[#008A74] flex items-center justify-center font-bold text-xs">
                        {medecin.nom.split(' ').slice(-2).map(n => n[0]).join('')}
                      </div>
                      <span>{medecin.nom}</span>
                    </div>
                  </td>
                  {/* ID */}
                  <td className="px-6 py-4 text-xs font-mono text-gray-500">#{medecin.id}</td>
                  {/* Spécialité */}
                  <td className="px-6 py-4 text-gray-600">{medecin.specialite}</td>
                  {/* Consultations */}
                  <td className="px-6 py-4 font-semibold text-gray-800">{medecin.consultations} rdv</td>
                  {/* Statut avec badges couleurs */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      medecin.statut === "Disponible" ? "bg-green-50 text-green-700 border border-green-200" :
                      medecin.statut === "En consultation" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                      "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {medecin.statut}
                    </span>
                  </td>
                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-semibold text-[#008A74] hover:text-[#003B32] hover:underline transition-all">
                      Voir l'agenda →
                    </button>
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