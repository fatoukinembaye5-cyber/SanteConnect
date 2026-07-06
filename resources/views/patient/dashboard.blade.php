@extends('layouts.app')

@section('title', 'Tableau de bord Patient - SanteConnect')

@section('styles')
<style>
    .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
    }
    .profile-card {
        height: fit-content;
    }
    .profile-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .profile-avatar {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: var(--primary-light);
        color: var(--primary);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        margin-bottom: 1rem;
        border: 2px solid var(--primary);
    }
    .profile-details p {
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
        color: var(--text-muted);
    }
    .profile-details strong {
        color: var(--text-main);
    }
    .section-title {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #818cf8;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .dashboard-tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
    }
    .tab-btn {
        background: transparent;
        border: none;
        color: var(--text-muted);
        font-size: 1rem;
        font-weight: 600;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 8px;
    }
    .tab-btn.active {
        color: var(--text-main);
        background: var(--primary-light);
    }
    .tab-content {
        display: none;
    }
    .tab-content.active {
        display: block;
    }
    .item-card {
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid var(--border-color);
        border-radius: 14px;
        padding: 1.25rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: transform 0.3s ease;
    }
    .item-card:hover {
        transform: translateX(4px);
        background: rgba(15, 23, 42, 0.5);
    }
    .item-info h4 {
        font-size: 1.1rem;
        margin-bottom: 0.25rem;
        color: var(--text-main);
    }
    .item-info p {
        font-size: 0.9rem;
        color: var(--text-muted);
    }
    .status-badge {
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    .badge-en_attente {
        background: rgba(245, 158, 11, 0.15);
        color: #f59e0b;
    }
    .badge-confirme {
        background: rgba(16, 185, 129, 0.15);
        color: var(--accent);
    }
    .badge-annule {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
    }
    .badge-active {
        background: rgba(16, 185, 129, 0.15);
        color: var(--accent);
    }
    .badge-expiree {
        background: rgba(100, 116, 139, 0.15);
        color: #64748b;
    }
    .form-group {
        margin-bottom: 1.25rem;
    }
    .form-label {
        display: block;
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--text-main);
    }
    .form-control {
        width: 100%;
        padding: 0.8rem 1rem;
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid var(--border-color);
        color: var(--text-main);
        font-size: 0.95rem;
        transition: all 0.3s ease;
    }
    .form-control:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    }
    @media (max-width: 900px) {
        .dashboard-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
@endsection

@section('content')
<div class="dashboard-grid">
    
    <!-- Profil gauche -->
    <div class="glass-card profile-card">
        <div class="profile-header">
            <div class="profile-avatar">
                <i class="fa-solid fa-user"></i>
            </div>
            <h3>{{ $patient->prenom }} {{ $patient->nom }}</h3>
            <p style="color: var(--primary); font-weight: 500;">Patient SanteConnect</p>
        </div>
        
        <div class="profile-details">
            <h4 style="margin-bottom: 1rem; color: var(--text-main);"><i class="fa-solid fa-info-circle"></i> Mes Informations</h4>
            <p><i class="fa-solid fa-calendar-day"></i> Naissance : <strong>{{ $patient->date_naissance ? $patient->date_naissance->format('d/m/Y') : 'Non renseignée' }}</strong></p>
            <p><i class="fa-solid fa-venus-mars"></i> Genre : <strong>{{ $patient->sexe == 'M' ? 'Masculin' : ($patient->sexe == 'F' ? 'Féminin' : 'Non spécifié') }}</strong></p>
            <p><i class="fa-solid fa-phone"></i> Téléphone : <strong>{{ $patient->telephone ?? 'Non renseigné' }}</strong></p>
            <p><i class="fa-solid fa-house-medical"></i> Adresse : <strong>{{ $patient->adresse ?? 'Non renseignée' }}</strong></p>
            
            @if($patient->notes_medicales)
                <div style="margin-top: 1.5rem; padding: 1rem; border-radius: 12px; background: rgba(236, 72, 153, 0.05); border: 1px dashed rgba(236, 72, 153, 0.2);">
                    <h5 style="color: var(--secondary); margin-bottom: 0.5rem;"><i class="fa-solid fa-clipboard-list"></i> Notes Médicales</h5>
                    <p style="font-size: 0.9rem; margin-bottom: 0; line-height: 1.4;">{{ $patient->notes_medicales }}</p>
                </div>
            @endif
        </div>
    </div>

    <!-- Contenu principal droite -->
    <div class="glass-card">
        
        <div class="dashboard-tabs">
            <button class="tab-btn active" onclick="switchTab('tab-rendezvous')"><i class="fa-solid fa-calendar-check"></i> Mes Rendez-vous</button>
            <button class="tab-btn" onclick="switchTab('tab-ordonnances')"><i class="fa-solid fa-prescription-bottle-medical"></i> Mes Ordonnances</button>
            <button class="tab-btn" onclick="switchTab('tab-dossier')"><i class="fa-solid fa-folder-open"></i> Mon Dossier Médical</button>
            <button class="tab-btn" onclick="switchTab('tab-book')"><i class="fa-solid fa-calendar-plus"></i> Prendre RDV</button>
        </div>

        <!-- Tab 1: Rendez-vous -->
        <div id="tab-rendezvous" class="tab-content active">
            <h3 class="section-title"><i class="fa-solid fa-calendar-check"></i> Rendez-vous planifiés</h3>
            @if($rendezVous->isEmpty())
                <p style="color: var(--text-muted); text-align: center; padding: 2rem;">Vous n'avez aucun rendez-vous planifié pour le moment.</p>
            @else
                @foreach($rendezVous as $rdv)
                    <div class="item-card">
                        <div class="item-info">
                            <h4>Avec le {{ $rdv->medecin->utilisateur->name }}</h4>
                            <p style="color: var(--primary); font-weight: 500;"><i class="fa-solid fa-stethoscope"></i> {{ $rdv->medecin->specialite }}</p>
                            <p><i class="fa-solid fa-clock"></i> Le {{ $rdv->scheduled_at->format('d/m/Y à H\hi') }}</p>
                            <p><i class="fa-solid fa-comment-medical"></i> Motif : "{{ $rdv->motif }}"</p>
                        </div>
                        <div>
                            <span class="status-badge badge-{{ $rdv->statut }}">
                                {{ $rdv->statut == 'en_attente' ? 'En attente' : ($rdv->statut == 'confirme' ? 'Confirmé' : ($rdv->statut == 'annule' ? 'Annulé' : $rdv->statut)) }}
                            </span>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>

        <!-- Tab 2: Ordonnances -->
        <div id="tab-ordonnances" class="tab-content">
            <h3 class="section-title"><i class="fa-solid fa-prescription-bottle-medical"></i> Prescriptions médicales</h3>
            @if($ordonnances->isEmpty())
                <p style="color: var(--text-muted); text-align: center; padding: 2rem;">Aucune ordonnance disponible dans votre espace.</p>
            @else
                @foreach($ordonnances as $ordonnance)
                    <div class="item-card" style="flex-direction: column; align-items: flex-start; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                            <div>
                                <h4 style="color: var(--text-main);">Prescrit par le {{ $ordonnance->medecin->utilisateur->name }}</h4>
                                <p><i class="fa-solid fa-calendar-day"></i> Le {{ $ordonnance->date_prescription ? $ordonnance->date_prescription->format('d/m/Y') : 'Non renseigné' }}</p>
                            </div>
                            <span class="status-badge badge-{{ $ordonnance->statut }}">
                                {{ $ordonnance->statut == 'active' ? 'Active' : 'Expirée' }}
                            </span>
                        </div>
                        <div style="background: rgba(255,255,255,0.03); width: 100%; padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color); font-family: monospace; white-space: pre-line;">{{ $ordonnance->contenu }}</div>
                    </div>
                @endforeach
            @endif
        </div>

        <!-- Tab 3: Dossiers -->
        <div id="tab-dossier" class="tab-content">
            <h3 class="section-title"><i class="fa-solid fa-folder-open"></i> Historique du dossier médical</h3>
            @if($dossiers->isEmpty())
                <p style="color: var(--text-muted); text-align: center; padding: 2rem;">Votre dossier médical est vide pour le moment.</p>
            @else
                @foreach($dossiers as $dossier)
                    <div class="item-card" style="flex-direction: column; align-items: flex-start; gap: 0.5rem;">
                        <h4 style="color: #ec4899;"><i class="fa-solid fa-file-medical"></i> {{ $dossier->titre }}</h4>
                        <p><i class="fa-solid fa-calendar-alt"></i> Date d'enregistrement : {{ $dossier->date_creation ? $dossier->date_creation->format('d/m/Y') : $dossier->created_at->format('d/m/Y') }}</p>
                        <p><i class="fa-solid fa-user-md"></i> Médecin : {{ $dossier->medecin->utilisateur->name ?? 'Système' }} ({{ $dossier->type ?? 'Général' }})</p>
                        <div style="background: rgba(0,0,0,0.1); width: 100%; padding: 1rem; border-radius: 10px; font-size: 0.95rem; line-height: 1.5; color: #cbd5e1;">
                            {{ $dossier->description }}
                        </div>
                    </div>
                @endforeach
            @endif
        </div>

        <!-- Tab 4: Prendre RDV -->
        <div id="tab-book" class="tab-content">
            <h3 class="section-title"><i class="fa-solid fa-calendar-plus"></i> Prendre un nouveau rendez-vous</h3>
            
            <form action="{{ route('patient.rendezvous.store') }}" method="POST" style="margin-top: 1rem;">
                @csrf
                
                <div class="form-group">
                    <label for="medecin_id" class="form-label">Sélectionner un Médecin</label>
                    <select id="medecin_id" name="medecin_id" class="form-control" required>
                        <option value="">Sélectionner dans la liste...</option>
                        @foreach($medecins as $med)
                            <option value="{{ $med->id }}">{{ $med->utilisateur->name }} ({{ $med->specialite }}) - {{ $med->cabinet }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label for="scheduled_at" class="form-label">Date & Heure souhaitées</label>
                    <input type="datetime-local" id="scheduled_at" name="scheduled_at" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="motif" class="form-label">Motif de consultation</label>
                    <input type="text" id="motif" name="motif" class="form-control" placeholder="Ex: Consultation de contrôle, fièvre, etc." required>
                </div>

                <div class="form-group">
                    <label for="notes" class="form-label">Notes ou Remarques pour le médecin (Optionnel)</label>
                    <textarea id="notes" name="notes" class="form-control" rows="3" placeholder="Symptômes particuliers, traitements actuels..."></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.8rem;">
                    <i class="fa-solid fa-paper-plane"></i> Confirmer la demande de rendez-vous
                </button>
            </form>
        </div>

    </div>

</div>

<script>
    function switchTab(tabId) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(function(content) {
            content.classList.remove('active');
        });
        
        // Remove active class from buttons
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        // Show current tab
        document.getElementById(tabId).classList.add('active');
        
        // Find button triggering this and make active
        // Trick: match by onclick attribute matching tabId
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            if(btn.getAttribute('onclick').includes(tabId)) {
                btn.classList.add('active');
            }
        });
    }
</script>
@endsection
