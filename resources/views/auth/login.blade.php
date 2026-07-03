@extends('layouts.app')

@section('title', 'Connexion - SanteConnect')

@section('styles')
<style>
    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 70vh;
    }
    .auth-card {
        width: 100%;
        max-width: 480px;
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
    .form-group {
        margin-bottom: 1.5rem;
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
    .form-check {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    .form-check-input {
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 4px;
        border: 1px solid var(--border-color);
        background: rgba(15, 23, 42, 0.4);
        cursor: pointer;
    }
    .form-check-label {
        font-size: 0.9rem;
        color: var(--text-muted);
        cursor: pointer;
    }
    .btn-submit {
        width: 100%;
        justify-content: center;
        padding: 0.9rem;
        font-size: 1rem;
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
    .portal-link-divider {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 1.5rem 0;
        color: var(--text-muted);
        font-size: 0.8rem;
    }
    .portal-link-divider::before, .portal-link-divider::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid var(--border-color);
    }
    .portal-link-divider:not(:empty)::before {
        margin-right: .5em;
    }
    .portal-link-divider:not(:empty)::after {
        margin-left: .5em;
    }
    .register-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>
@endsection

@section('content')
<div class="auth-container">
    <div class="glass-card auth-card">
        
        <div class="auth-header">
            <h2>Bienvenue</h2>
            <p>Connectez-vous à votre espace SanteConnect</p>
        </div>

        <form action="{{ route('login') }}" method="POST">
            @csrf
            
            <div class="form-group">
                <label for="email" class="form-label">Adresse Email</label>
                <div class="input-group">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" id="email" name="email" class="form-control" placeholder="nom@exemple.com" value="{{ old('email') }}" required autofocus>
                </div>
            </div>

            <div class="form-group">
                <label for="password" class="form-label">Mot de Passe</label>
                <div class="input-group">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" id="password" name="password" class="form-control" placeholder="••••••••" required>
                </div>
            </div>

            <div class="form-check">
                <input type="checkbox" id="remember" name="remember" class="form-check-input">
                <label for="remember" class="form-check-label">Se souvenir de moi</label>
            </div>

            <button type="submit" class="btn btn-primary btn-submit">
                <i class="fa-solid fa-right-to-bracket"></i> Se connecter
            </button>
        </form>

        <div class="portal-link-divider">ou créer un compte</div>

        <div class="register-options">
            <a href="{{ route('register.patient') }}" class="btn btn-secondary" style="justify-content: center;">
                <i class="fa-solid fa-user"></i> Patient
            </a>
            <a href="{{ route('register.medecin') }}" class="btn btn-secondary" style="justify-content: center; border-color: rgba(99,102,241,0.3)">
                <i class="fa-solid fa-user-doctor"></i> Médecin
            </a>
        </div>

    </div>
</div>
@endsection
