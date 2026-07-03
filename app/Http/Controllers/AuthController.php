<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Show the login form.
     */
    public function showLogin()
    {
        return view('auth.login');
    }

    /**
     * Handle authentication attempt.
     */
    public function login(Request $request)
    {
        // 1. Validate inputs
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // 2. Attempt authentication
        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            // 3. Redirect user based on their role
            $user = Auth::user();

            if ($user->role === 'patient') {
                return redirect()->intended('/patient/dashboard');
            } elseif ($user->role === 'medecin') {
                return redirect()->intended('/medecin/dashboard');
            } elseif ($user->role === 'super_admin') {
                return redirect()->intended('/admin/dashboard');
            }

            // Fallback
            return redirect('/');
        }

        // 4. Return error if login failed
        return back()->withErrors([
            'email' => 'Les identifiants fournis ne correspondent pas à nos enregistrements.',
        ])->onlyInput('email');
    }

    /**
     * Log the user out.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login')->with('success', 'Vous avez été déconnecté.');
    }
}
