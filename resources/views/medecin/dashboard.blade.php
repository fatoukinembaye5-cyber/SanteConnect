@extends('layouts.app')

@section('title', 'Tableau de bord Médecin - SanteConnect')

@section('styles')
<style>
    .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr 2.5fr;
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
        background: rgba(16, 185, 129, 0.15);
        color: var(--accent);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        margin-bottom: 1rem;
        border: 2px solid var(--accent);
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
        color: var(--accent);
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
        flex-wrap: wrap;
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
        background: rgba(16, 185, 129, 0.15);
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
        display: inline-block;
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
    .badge-termine {
        background: rgba(99, 102, 241, 0.15);
        color: var(--primary);
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
        border-color: var(--accent);
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
    }
    .action-btns {
        display: flex;
        gap: 0.5rem;
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
                <i class="fa-solid fa-user-doctor"></i>
            </div>
            <h3>{{ Auth::user()->name }}</h3>
            <p style="color: var(--accent); font-weight: 500;">Médecin - {{ $medecin->specialite }}</p>
        </div>
        
        <div class="profile-details">
            <h4 style="margin-bottom: 1rem; color: var(--text-main);"><i class="fa-solid fa-address-book"></i> Informations Cabinet</h4>
            <p><i class="fa-solid fa-id-badge"></i> RPPS : <strong>{{ $medecin->matricule }}</strong></p>
            <p><i class="fa-solid fa-phone"></i> Téléphone : <strong>{{ $medecin->telephone ?? 'Non spécifié' }}</strong></p>
            <p><i class="fa-solid fa-clinic-medical"></i> Cabinet : <strong>{{ $medecin->cabinet ?? 'Non spécifié' }}</strong></p>
            <p><i class="fa-solid fa-map-marker-alt"></i> Adresse : <strong>{{ $medecin->adresse ?? 'Non spécifiée' }}</strong></p>
            <p><i class="fa-solid fa-info-circle"></i> Statut : 
                <span class="status-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--accent); font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 10px;">
                    {{ ucfirst($medecin->statut) }}
                </span>
            </p>
        </div>
    </div>

    <!-- Contenu principal droite -->
    <div class="glass-card">
        
        <div class="dashboard-tabs">
            <button class="tab-btn active" onclick="switchTab('tab-consultations')"><i class="fa-solid fa-calendar-check"></i> Mes Rendez-vous</button>
            <button class="tab-btn" onclick="switchTab('tab-plannings')"><i class="fa-solid fa-calendar-days"></i> Mes Disponibilités</button>
            <button class="tab-btn" onclick="switchTab('tab-ordonnance')"><i class="fa-solid fa-prescription-bottle-medical"></i> Rédiger Ordonnance</button>
        </div>

        <!-- Tab 1: Consultations / Rendez-vous -->
        <div id="tab-consultations" class="tab-content active">
            <h3 class="section-title" style="color: var(--accent);"><i class="fa-solid fa-calendar-check"></i> Rendez-vous patients</h3>
            @if($rendezVous->isEmpty())
                <p style="color: var(--text-muted); text-align: center; padding: 2rem;">Vous n'avez aucun rendez-vous pour le moment.</p>
            @else
                @foreach($rendezVous as $rdv)
                    <div class="item-card" style="flex-direction: column; align-items: flex-start; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                            <div>
                                <h4 style="color: var(--text-main);"><i class="fa-solid fa-user"></i> Patient : {{ $rdv->patient->prenom }} {{ $rdv->patient->nom }}</h4>
                                <p><i class="fa-solid fa-clock"></i> Le {{ $rdv->scheduled_at->format('d/m/Y à H\hi') }}</p>
                                <p><i class="fa-solid fa-notes-medical"></i> Motif : "{{ $rdv->motif }}"</p>
                                @if($rdv->notes)
                                    <p style="font-size: 0.85rem; font-style: italic; color: #cbd5e1;"><i class="fa-solid fa-info-circle"></i> Notes patient : {{ $rdv->notes }}</p>
                                @endif
                            </div>
                            <div>
                                <span class="status-badge badge-{{ $rdv->statut }}">
                                    {{ $rdv->statut == 'en_attente' ? 'En attente' : ($rdv->statut == 'confirme' ? 'Confirmé' : ($rdv->statut == 'annule' ? 'Annulé' : ($rdv->statut == 'termine' ? 'Terminé' : $rdv->statut))) }}
                                </span>
                            </div>
                        </div>
                        
                        @if($rdv->statut === 'en_attente' || $rdv->statut === 'confirme')
                            <div class="action-btns" style="margin-top: 0.5rem;">
                                @if($rdv->statut === 'en_attente')
                                    <form action="{{ route('medecin.rendezvous.status', $rdv->id) }}" method="POST">
                                        @csrf
                                        <input type="hidden" name="statut" value="confirme">
                                        <button type="submit" class="btn btn-primary" style="background: var(--accent); padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                                            <i class="fa-solid fa-check"></i> Confirmer
                                        </button>
                                    </form>
                                @endif

                                @if($rdv->statut === 'confirme')
                                    <form action="{{ route('medecin.rendezvous.status', $rdv->id) }}" method="POST">
                                        @csrf
                                        <input type="hidden" name="statut" value="termine">
                                        <button type="submit" class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                                            <i class="fa-solid fa-circle-check"></i> Terminer
                                        </button>
                                    </form>
                                @endif

                                <form action="{{ route('medecin.rendezvous.status', $rdv->id) }}" method="POST">
                                    @csrf
                                    <input type="hidden" name="statut" value="annule">
                                    <button type="submit" class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                                        <i class="fa-solid fa-xmark"></i> Annuler
                                    </button>
                                </form>
                            </div>
                        @endif
                    </div>
                @endforeach
            @endif
        </div>

        <!-- Tab 2: Plannings / Disponibilités -->
        <div id="tab-plannings" class="tab-content">
            <h3 class="section-title" style="color: #6366f1;"><i class="fa-solid fa-calendar-days"></i> Mes horaires de disponibilité</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem;">
                
                <!-- Ajouter disponibilité -->
                <div>
                    <h4 style="margin-bottom: 1rem; color: var(--text-main); font-size: 1.1rem;">Ajouter une plage horaire</h4>
                    <form action="{{ route('medecin.planning.store') }}" method="POST">
                        @csrf
                        
                        <div class="form-group">
                            <label for="date" class="form-label">Date</label>
                            <input type="date" id="date" name="date" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="start_time" class="form-label">Heure de début</label>
                            <input type="time" id="start_time" name="start_time" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="end_time" class="form-label">Heure de fin</label>
                            <input type="time" id="end_time" name="end_time" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="notes" class="form-label">Notes (Optionnel)</label>
                            <input type="text" id="notes" name="notes" class="form-control" placeholder="Ex: Consultation en ligne uniquement">
                        </div>

                        <button type="submit" class="btn btn-primary" style="background: #6366f1; width: 100%; justify-content: center; padding: 0.75rem;">
                            <i class="fa-solid fa-plus-circle"></i> Ajouter la plage
                        </button>
                    </form>
                </div>

                <!-- Liste des disponibilités -->
                <div>
                    <h4 style="margin-bottom: 1rem; color: var(--text-main); font-size: 1.1rem;">Mes plages configurées</h4>
                    @if($plannings->isEmpty())
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Aucune plage horaire configurée.</p>
                    @else
                        @foreach($plannings as $plan)
                            <div style="background: rgba(15,23,42,0.3); border: 1px solid var(--border-color); padding: 0.8rem; border-radius: 10px; margin-bottom: 0.75rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <strong>Le {{ $plan->date->format('d/m/Y') }}</strong>
                                    <span class="status-badge" style="font-size: 0.7rem; padding: 0.1rem 0.4rem; background: rgba(16, 185, 129, 0.15); color: var(--accent);">
                                        {{ $plan->is_available ? 'Disponible' : 'Réservée' }}
                                    </span>
                                </div>
                                <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">
                                    <i class="fa-solid fa-clock"></i> {{ \Carbon\Carbon::parse($plan->start_time)->format('H\hi') }} - {{ \Carbon\Carbon::parse($plan->end_time)->format('H\hi') }}
                                </p>
                                @if($plan->notes)
                                    <p style="font-size: 0.8rem; font-style: italic; margin-top: 0.25rem; color: var(--text-muted);">{{ $plan->notes }}</p>
                                @endif
                            </div>
                        @endforeach
                    @endif
                </div>

            </div>
        </div>

        <!-- Tab 3: Rédiger Ordonnance -->
        <div id="tab-ordonnance" class="tab-content">
            <h3 class="section-title" style="color: #ec4899;"><i class="fa-solid fa-prescription-bottle-medical"></i> Rédiger une ordonnance</h3>
            
            <form action="{{ route('medecin.ordonnance.store') }}" method="POST" style="margin-top: 1rem;">
                @csrf
                
                <div class="form-group">
                    <label for="patient_id" class="form-label">Sélectionner un Patient</label>
                    <select id="patient_id" name="patient_id" class="form-control" required>
                        <option value="">Sélectionner dans la liste...</option>
                        @foreach($patients as $pat)
                            <option value="{{ $pat->id }}">{{ $pat->nom }} {{ $pat->prenom }} (né(e) le : {{ $pat->date_naissance ? $pat->date_naissance->format('d/m/Y') : 'Non renseigné' }})</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="date_prescription" class="form-label">Date de prescription</label>
                        <input type="date" id="date_prescription" name="date_prescription" class="form-control" value="{{ date('Y-m-d') }}" required>
                    </div>

                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="date_expiration" class="form-label">Date d'expiration (Optionnel)</label>
                        <input type="date" id="date_expiration" name="date_expiration" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label for="contenu" class="form-label">Médicaments et Posologie</label>
                    <textarea id="contenu" name="contenu" class="form-control" rows="8" placeholder="Ex:&#10;1. Doliprane 1000mg : 1 gélule 3 fois par jour pendant 5 jours.&#10;2. Amoxicilline 1g : 1 sachet matin et soir pendant 7 jours." required></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="background: #ec4899; width: 100%; justify-content: center; padding: 0.8rem;">
                    <i class="fa-solid fa-file-signature"></i> Valider et Enregistrer l'Ordonnance
                </button>
            </form>
        </div>

    </div>

</div>

<script>
    function switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(function(content) {
            content.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        document.getElementById(tabId).classList.add('active');
        
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            if(btn.getAttribute('onclick').includes(tabId)) {
                btn.classList.add('active');
            }
        });
    }
</script>
@endsection
