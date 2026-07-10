import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadPatients() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch('/api/patients');
        if (!mounted) return;
        // Mapper les données pour correspondre au rendu
        const mapped = data.map((u) => ({
          id: `PT-${String(u.id).padStart(4, '0')}`,
          rawId: u.id,
          name: u.name || `${u.firstname || ''} ${u.lastname || ''}`.trim() || '—',
          age: u.age || '-',
          gender: u.gender || '-',
          doctor: u.doctor_name || u.medecin || '—',
          lastVisit: u.last_visit || (u.updated_at ? new Date(u.updated_at).toLocaleDateString() : '—'),
          nextVisit: u.next_visit || '--',
          status: u.status || 'Nouveau',
          color: '#93C5FD'
        }));
        setPatientsData(mapped);
      } catch (err) {
        setError(err.message || 'Erreur chargement patients');
      } finally {
        setLoading(false);
      }
    }
    loadPatients();
    return () => { mounted = false; };
  }, []);

  const filteredPatients = patientsData.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusStyle = (status) => {
    if (status === "Consulté") return { bg: "#E8F8F0", color: "#047857", dot: "#10B981" };
    if (status === "En attente") return { bg: "#FFFBEB", color: "#B45309", dot: "#F59E0B" };
    return { bg: "#E8F2FF", color: "#1E40AF", dot: "#3B82F6" };
  };

  return (
    <div style={{ width: "100%", animation: "fadeIn 0.25s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ margin: 0, fontSize: 18, color: "#374151" }}>LISTE PATIENTS</h3>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input
            type="text"
            placeholder="Rechercher par nom ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #E5E7EB", width: 300 }}
          />
          <button style={{ background: "#0EA5A9", color: "white", padding: "10px 14px", borderRadius: 10, border: "none" }}>Nouveau patient</button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 10, boxShadow: "0 1px 2px rgba(15,23,42,0.05)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr style={{ textAlign: "left", fontSize: 13, color: "#6B7280", borderBottom: "1px solid #EEF2F6" }}>
                <th style={{ padding: "16px 12px" }}>Patient</th>
                <th style={{ padding: "16px 12px" }}>Âge / Sexe</th>
                <th style={{ padding: "16px 12px" }}>Médecin référent</th>
                <th style={{ padding: "16px 12px" }}>Dernier RDV</th>
                <th style={{ padding: "16px 12px" }}>Prochain RDV</th>
                <th style={{ padding: "16px 12px" }}>Statut</th>
                <th style={{ padding: "16px 12px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} style={{ padding: 20, textAlign: 'center' }}>Chargement...</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={7} style={{ padding: 20, textAlign: 'center', color: '#DC2626' }}>{error}</td>
                </tr>
              )}

              {filteredPatients.map((p) => {
                const s = statusStyle(p.status);
                const initials = p.name.split(" ").map(n => n[0]).slice(0,2).join("");
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid #F3F4F6", fontSize: 14 }}>
                    <td style={{ padding: "14px 12px", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: p.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#111827" }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: "#6B7280" }}>{p.id}</div>
                      </div>
                    </td>

                    <td style={{ padding: "14px 12px", color: "#4B5563" }}>{p.age} ans ({p.gender})</td>
                    <td style={{ padding: "14px 12px", color: "#374151" }}>{p.doctor}</td>
                    <td style={{ padding: "14px 12px", color: "#6B7280" }}>{p.lastVisit}</td>
                    <td style={{ padding: "14px 12px", color: "#6B7280" }}>{p.nextVisit}</td>
                    <td style={{ padding: "14px 12px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: s.bg, color: s.color, fontWeight: 600 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: s.dot }} />
                        <span style={{ fontSize: 13 }}>{p.status}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 12px", textAlign: "center" }}>
                      <button style={{ border: "none", background: "transparent", cursor: "pointer", padding: 8, borderRadius: 8 }} aria-label="actions">
                        <svg width="18" height="6" viewBox="0 0 18 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="3" cy="3" r="2" fill="#9CA3AF" />
                          <circle cx="9" cy="3" r="2" fill="#9CA3AF" />
                          <circle cx="15" cy="3" r="2" fill="#9CA3AF" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderTop: "1px solid #F3F4F6", background: "#FAFAFB" }}>
          <div style={{ color: "#6B7280", fontSize: 13 }}>Affichage 1-4 sur 1240 patients</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "white" }}>Préc</button>
            <button style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "white" }}>Suiv</button>
          </div>
        </div>
      </div>
    </div>
  );
}