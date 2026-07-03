@extends('layouts.app')

@section('title', 'Administration - SanteConnect')

@section('styles')
<style>
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    .stat-card {
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.25rem;
    }
    .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.8rem;
    }
    .stat-number {
        font-size: 1.8rem;
        font-weight: 800;
        font-family: 'Outfit', sans-serif;
        color: var(--text-main);
    }
    .stat-label {
        font-size: 0.9rem;
        color: var(--text-muted);
        font-weight: 500;
    }
    .dashboard-sections {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    .table-container {
        overflow-x: auto;
        margin-top: 1rem;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    th, td {
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.95rem;
    }
    th {
        color: var(--primary);
        font-family: 'Outfit', sans-serif;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.02);
    }
    tr:hover td {
        background: rgba(255, 255, 255, 0.01);
    }
    .status-badge {
        padding: 0.2rem 0.6rem;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    .badge-actif {
        background: rgba(16, 185, 129, 0.15);
        color: var(--accent);
    }
    .badge-inactif {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
    }
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.75rem;
        margin-bottom: 1rem;
    }
</style>
@endsection

@section('content')
<h2 style="margin-bottom: 1.5rem; font-family: 'Outfit', sans-serif; font-size: 2rem;">
    <i class="fa-solid fa-user-shield" style="color: var(--primary);"></i> Espace Administration
</h2>

<!-- Cartes Statistiques -->
<div class="stats-grid">
    <div class="glass-card stat-card">
        <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--primary);">
            <i class="fa-solid fa-users"></i>
        </div>
        <div>
            <div class="stat-number">{{ $stats['total_users'] }}</div>
            <div class="stat-label">Comptes Utilisateurs</div>
        </div>
    </div>

    <div class="glass-card stat-card">
        <div class="stat-icon" style="background: rgba(236, 72, 153, 0.15); color: var(--secondary);">
            <i class="fa-solid fa-hospital-user"></i>
        </div>
        <div>
            <div class="stat-number">{{ $stats['total_patients'] }}</div>
            <div class="stat-label">Patients enregistrés</div>
        </div>
    </div>

    <div class="glass-card stat-card">
        <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--accent);">
            <i class="fa-solid fa-user-doctor"></i>
        </div>
        <div>
            <div class="stat-number">{{ $stats['total_medecins'] }}</div>
            <div class="stat-label">Médecins actifs</div>
        </div>
    </div>

    <div class="glass-card stat-card">
        <div class="stat-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
            <i class="fa-solid fa-calendar-check"></i>
        </div>
        <div>
            <div class="stat-number">{{ $stats['total_appointments'] }}</div>
            <div class="stat-label">Rendez-vous créés</div>
        </div>
    </div>
</div>

<!-- Section Tableaux -->
<div class="dashboard-sections">
    
    <!-- Liste des Médecins -->
    <div class="glass-card">
        <div class="section-header">
            <h3 style="color: var(--accent);"><i class="fa-solid fa-stethoscope"></i> Liste des Professionnels de Santé</h3>
        </div>

        @if($medecins->isEmpty())
            <p style="color: var(--text-muted); text-align: center; padding: 2rem;">Aucun médecin enregistré sur le portail.</p>
        @else
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nom & Prénom</th>
                            <th>RPPS Matricule</th>
                            <th>Spécialité</th>
                            <th>Cabinet</th>
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($medecins as $med)
                            <tr>
                                <td><strong>{{ $med->utilisateur->name }}</strong><br><span style="font-size: 0.8rem; color: var(--text-muted);">{{ $med->utilisateur->email }}</span></td>
                                <td><code>{{ $med->matricule }}</code></td>
                                <td>{{ $med->specialite }}</td>
                                <td>{{ $med->cabinet ?? 'Non renseigné' }}</td>
                                <td>
                                    <span class="status-badge badge-{{ $med->statut }}">
                                        {{ ucfirst($med->statut) }}
                                    </span>
                                </td>
                                <td>
                                    <form action="{{ route('admin.medecin.toggle', $med->id) }}" method="POST">
                                        @csrf
                                        <button type="submit" class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">
                                            @if($med->statut === 'actif')
                                                <i class="fa-solid fa-user-slash"></i> Désactiver
                                            @else
                                                <i class="fa-solid fa-user-check"></i> Activer
                                            @endif
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>

    <!-- Liste des Patients -->
    <div class="glass-card">
        <div class="section-header">
            <h3 style="color: var(--secondary);"><i class="fa-solid fa-hospital-user"></i> Patients de la plateforme</h3>
        </div>

        @if($patients->isEmpty())
            <p style="color: var(--text-muted); text-align: center; padding: 2rem;">Aucun patient inscrit pour le moment.</p>
        @else
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Identité</th>
                            <th>Email</th>
                            <th>Genre</th>
                            <th>Date de Naissance</th>
                            <th>Téléphone</th>
                            <th>Inscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($patients as $pat)
                            <tr>
                                <td><strong>{{ $pat->nom }} {{ $pat->prenom }}</strong></td>
                                <td>{{ $pat->utilisateur->email }}</td>
                                <td>{{ $pat->sexe ?? 'N/A' }}</td>
                                <td>{{ $pat->date_naissance ? $pat->date_naissance->format('d/m/Y') : 'Non renseignée' }}</td>
                                <td>{{ $pat->telephone ?? 'Non renseigné' }}</td>
                                <td><span style="font-size: 0.8rem; color: var(--text-muted);">{{ $pat->created_at->format('d/m/Y à H:i') }}</span></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>

</div>
@endsection
