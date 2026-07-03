<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'SanteConnect - Votre Portail de Santé')</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- CSS Theme Custom Styles -->
    <style>
        :root {
            --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --primary-light: rgba(99, 102, 241, 0.15);
            --secondary: #ec4899;
            --accent: #10b981;
            --accent-hover: #059669;
            --dark-surface: rgba(30, 41, 59, 0.7);
            --border-color: rgba(255, 255, 255, 0.08);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --glass-bg: rgba(15, 23, 42, 0.6);
            --glass-blur: blur(16px);
            --card-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg-gradient);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
        }

        /* Glassmorphic Navigation Bar */
        header {
            position: sticky;
            top: 0;
            z-index: 100;
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            border-bottom: 1px solid var(--border-color);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            color: var(--text-main);
            font-family: 'Outfit', sans-serif;
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(to right, #818cf8, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .logo i {
            -webkit-text-fill-color: initial;
            background: none;
            color: var(--primary);
            font-size: 1.8rem;
        }

        nav {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .nav-link {
            text-decoration: none;
            color: var(--text-muted);
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.3s ease;
        }

        .nav-link:hover {
            color: var(--text-main);
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.2rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            border: none;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
        }

        .btn-primary:hover {
            background: var(--primary-hover);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .btn-secondary {
            background: transparent;
            color: var(--text-main);
            border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-2px);
        }

        .btn-danger {
            background: #ef4444;
            color: white;
        }

        .btn-danger:hover {
            background: #dc2626;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        /* Alert notifications */
        .alerts-container {
            width: 100%;
            max-width: 1200px;
            margin: 1.5rem auto 0 auto;
            padding: 0 1.5rem;
        }

        .alert {
            padding: 1rem 1.5rem;
            border-radius: 12px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.95rem;
            border-left: 4px solid;
            animation: slideIn 0.3s ease-out;
        }

        .alert-success {
            background: rgba(16, 185, 129, 0.1);
            border-color: var(--accent);
            color: #a7f3d0;
        }

        .alert-danger {
            background: rgba(239, 68, 68, 0.1);
            border-color: #ef4444;
            color: #fecaca;
        }

        /* Main layout container */
        main {
            flex: 1;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
        }

        /* Footer styling */
        footer {
            text-align: center;
            padding: 2rem;
            color: var(--text-muted);
            font-size: 0.85rem;
            border-top: 1px solid var(--border-color);
            margin-top: auto;
        }

        /* Card templates */
        .glass-card {
            background: var(--dark-surface);
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: var(--card-shadow);
        }

        @keyframes slideIn {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
            header {
                padding: 1rem;
                flex-direction: column;
                gap: 1rem;
            }
            nav {
                width: 100%;
                justify-content: center;
                flex-wrap: wrap;
            }
        }
    </style>
    @yield('styles')
</head>
<body>

    <!-- Header Navigation -->
    <header>
        <a href="{{ url('/') }}" class="logo">
            <i class="fa-solid fa-heart-pulse"></i>
            SanteConnect
        </a>
        <nav>
            @auth
                <span class="nav-link" style="color: var(--text-main)">
                    <i class="fa-solid fa-user-circle"></i> {{ Auth::user()->name }} 
                    <span style="font-size: 0.75rem; background: var(--primary-light); color: var(--primary); padding: 0.2rem 0.5rem; border-radius: 20px; margin-left: 0.25rem;">
                        {{ ucfirst(Auth::user()->role) }}
                    </span>
                </span>
                
                @if(Auth::user()->role === 'patient')
                    <a href="{{ route('patient.dashboard') }}" class="nav-link"><i class="fa-solid fa-chart-line"></i> Dashboard</a>
                @elseif(Auth::user()->role === 'medecin')
                    <a href="{{ route('medecin.dashboard') }}" class="nav-link"><i class="fa-solid fa-stethoscope"></i> Dashboard</a>
                @elseif(Auth::user()->role === 'super_admin')
                    <a href="{{ route('admin.dashboard') }}" class="nav-link"><i class="fa-solid fa-user-shield"></i> Admin</a>
                @endif

                <a href="{{ route('logout') }}" class="btn btn-secondary" 
                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <i class="fa-solid fa-sign-out-alt"></i> Déconnexion
                </a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            @else
                <a href="{{ route('login') }}" class="nav-link">Connexion</a>
                <a href="{{ route('register.patient') }}" class="btn btn-secondary">Inscription Patient</a>
                <a href="{{ route('register.medecin') }}" class="btn btn-primary">Inscription Médecin</a>
            @endauth
        </nav>
    </header>

    <!-- Session Alerts -->
    <div class="alerts-container">
        @if(session('success'))
            <div class="alert alert-success">
                <i class="fa-solid fa-check-circle"></i>
                <div>{{ session('success') }}</div>
            </div>
        @endif

        @if(session('error'))
            <div class="alert alert-danger">
                <i class="fa-solid fa-exclamation-circle"></i>
                <div>{{ session('error') }}</div>
            </div>
        @endif

        @if($errors->any())
            <div class="alert alert-danger">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <div>
                    <ul style="list-style-type: none; margin: 0; padding: 0;">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
        @endif
    </div>

    <!-- Main Content -->
    <main>
        @yield('content')
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; {{ date('Y') }} SanteConnect. Conçu de manière pédagogique pour l'apprentissage de Laravel.</p>
    </footer>

</body>
</html>
