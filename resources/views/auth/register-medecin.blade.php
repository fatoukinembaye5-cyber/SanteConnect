@extends('layouts.app')

@section('title', 'Inscription Médecin - SanteConnect')

@section('styles')
<style>
    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 2rem 0;
    }
    .auth-card {
        width: 100%;
        max-width: 650px;
        position: relative;
    }
    .auth-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    .auth-header h2 {
        font-size: 2.2rem;
        margin-bottom: 0.5rem;
        background: linear-gradient(to right, #818cf8, #ec4899);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .auth-header p {
        color: var(--text-muted);
        font-size: 0.95rem;
    }
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
        margin-bottom: 1.5rem;
    }
    .form-group {
        margin-bottom: 1.25rem;
    }
    .form-group-full {
        grid-column: span 2;
    }
    .form-label {
        display: block;
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--text-main);
    }
    .input-group {
        position: relative;
        display: flex;
        align-items: center;
    }
    .input-group i {
        position: absolute;
        left: 1rem;
        color: var(--text-muted);
        font-size: 1.1rem;
    }
    .form-control {
        width: 100%;
        padding: 0.8rem 1rem 0.8rem 2.8rem;
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
        background: rgba(15, 23, 42, 0.6);
    }
    .btn-submit {
        width: 100%;
        justify-content: center;
        padding: 0.9rem;
        font-size: 1rem;
        margin-top: 1rem;
    }
    .auth-footer {
        text-align: center;
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: var(--text-muted);
    }
    .auth-footer a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;
    }
    .auth-footer a:hover {
        color: var(--secondary);
    }
    @media (max-width: 600px) {
        .form-grid {
            grid-template-columns: 1fr;
        }
        .form-group-full {
            grid-column: span 1;
        }
    }
</style>
@endsection

@section('content')
<div class="auth-container">
    <div class="glass-card auth-card">
        
        <div class="auth-header">
            <h2>Espace Professionnel</h2>
            <p>Créez votre compte médecin sur SanteConnect</p>
        </div>

        <form action="{{ route('register.medecin') }}" method="POST">
            @csrf
            
            <h3 style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: #818cf8; font-size: 1.1rem;">
                <i class="fa-solid fa-lock"></i> Identifiants Professionnels
            </h3>

            <div class="form-grid">
                <div class="form-group">
                    <label for="name" class="form-label">Nom d'affichage (Ex: Dr. Dupont)</label>
                    <div class="input-group">
                        <i class="fa-solid fa-user-md"></i>
                        <input type="text" id="name" name="name" class="form-control" placeholder="Dr. Dupont" value="{{ old('name') }}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Adresse Email Professionnelle</label>
                    <div class="input-group">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" id="email" name="email" class="form-control" placeholder="dr.dupont@santeconnect.fr" value="{{ old('email') }}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Mot de Passe</label>
                    <div class="input-group">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" id="password" name="password" class="form-control" placeholder="Minimum 8 caractères" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password_confirmation" class="form-label">Confirmer le Mot de Passe</label>
                    <div class="input-group">
                        <i class="fa-solid fa-check-double"></i>
                        <input type="password" id="password_confirmation" name="password_confirmation" class="form-control" placeholder="Répéter le mot de passe" required>
                    </div>
                </div>
            </div>

            <h3 style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: #10b981; font-size: 1.1rem;">
                <i class="fa-solid fa-stethoscope"></i> Informations Médicales & Cabinet
            </h3>

            <div class="form-grid">
                <div class="form-group">
                    <label for="matricule" class="form-label">Numéro Matricule RPPS</label>
                    <div class="input-group">
                        <i class="fa-solid fa-id-card"></i>
                        <input type="text" id="matricule" name="matricule" class="form-control" placeholder="1010XXXXXXXX" value="{{ old('matricule') }}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="specialite" class="form-label">Spécialité Médicale</label>
                    <div class="input-group">
                        <i class="fa-solid fa-notes-medical"></i>
                        <input type="text" id="specialite" name="specialite" class="form-control" placeholder="Généraliste, Cardiologue, etc." value="{{ old('specialite') }}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="cabinet" class="form-label">Nom du Cabinet / Clinique</label>
                    <div class="input-group">
                        <i class="fa-solid fa-clinic-medical"></i>
                        <input type="text" id="cabinet" name="cabinet" class="form-control" placeholder="Cabinet Saint-Michel" value="{{ old('cabinet') }}">
                    </div>
                </div>

                <div class="form-group">
                    <label for="telephone" class="form-label">Téléphone du Cabinet</label>
                    <div class="input-group">
                        <i class="fa-solid fa-phone-alt"></i>
                        <input type="text" id="telephone" name="telephone" class="form-control" placeholder="01 23 45 67 89" value="{{ old('telephone') }}">
                    </div>
                </div>

                <div class="form-group form-group-full">
                    <label for="adresse" class="form-label">Adresse du Cabinet</label>
                    <div class="input-group">
                        <i class="fa-solid fa-map-location-dot"></i>
                        <input type="text" id="adresse" name="adresse" class="form-control" placeholder="45 Avenue de la République, 75011 Paris" value="{{ old('adresse') }}">
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary btn-submit" style="background: var(--accent);">
                <i class="fa-solid fa-user-doctor"></i> Créer mon compte Médecin
            </button>
        </form>

        <div class="auth-footer">
            Vous avez déjà un compte ? <a href="{{ route('login') }}">Connectez-vous ici</a>
        </div>

    </div>
</div>
@endsection
