import React, { useState } from "react";

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  // Exemple de données de patients réels
  const patientsData = [
    { id: "PT-0021", name: "Aissatou Ba", age: 28, gender: "F", phone: "+221 77 123 45 67", status: "Consulté", lastVisit: "Aujourd'hui, 10:15" },
    { id: "PT-0022", name: "Ibrahima Fall", age: 45, gender: "M", phone: "+221 76 987 65 43", status: "En attente", lastVisit: "Hier, 16:30" },
    { id: "PT-0023", name: "Moustapha Diop", age: 12, gender: "M", phone: "+221 70 456 11 22", status: "Nouveau", lastVisit: "05/07/2026" },
    { id: "PT-0024", name: "Sokhna Diagne", age: 34, gender: "F", phone: "+221 77 555 44 33", status: "Consulté", lastVisit: "02/07/2026" },
  ];

  // Filtrer la liste selon la recherche
  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid-card" style={{ width: "100%", animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: "20px", gap: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "18px" }}>Registre des Patients</h3>
        <input
          type="text"
          placeholder="Rechercher un patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            outline: "none",
            width: "250px",
            fontSize: "14px"
          }}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #edf2f0", color: "#7d8c88", fontSize: "13px" }}>
              <th style={{ padding: "12px 8px" }}>ID</th>
              <th style={{ padding: "12px 8px" }}>Nom Complet</th>
              <th style={{ padding: "12px 8px" }}>Âge / Sexe</th>
              <th style={{ padding: "12px 8px" }}>Téléphone</th>
              <th style={{ padding: "12px 8px" }}>Dernière Visite</th>
              <th style={{ padding: "12px 8px" }}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} style={{ borderBottom: "1px solid #f0f4f2", fontSize: "14px" }}>
                <td style={{ padding: "14px 8px", fontWeight: "600", color: "#555" }}>{patient.id}</td>
                <td style={{ padding: "14px 8px", fontWeight: "500" }}>{patient.name}</td>
                <td style={{ padding: "14px 8px", color: "#666" }}>{patient.age} ans ({patient.gender})</td>
                <td style={{ padding: "14px 8px", color: "#666" }}>{patient.phone}</td>
                <td style={{ padding: "14px 8px", color: "#888" }}>{patient.lastVisit}</td>
                <td style={{ padding: "14px 8px" }}>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: patient.status === "Consulté" ? "#e8f8f0" : patient.status === "En attente" ? "#fff8e7" : "#e8f2ff",
                    color: patient.status === "Consulté" ? "#2e7d32" : patient.status === "En attente" ? "#b78103" : "#1565c0"
                  }}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}