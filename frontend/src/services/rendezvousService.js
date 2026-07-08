import { apiFetch } from './api';

export async function fetchDashboardStats() {
  return apiFetch('/api/dashboard');
}

export async function fetchRendezvous() {
  return apiFetch('/api/rendezvous');
}

export async function fetchMesRendezvous() {
  return apiFetch('/api/rendezvous/mes');
}

export async function createRendezvous(data) {
  return apiFetch('/api/rendezvous', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fetchPatients() {
  return apiFetch('/api/patients');
}

export async function fetchMedecins() {
  return apiFetch('/api/medecins');
}

export async function fetchDossiers() {
  return apiFetch('/api/dossiers-medicaux');
}
