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
     * Handle login attempt.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $role = Auth::user()->role;
            $redirect = match($role) {
                'patient' => route('patient.dashboard'),
                'medecin' => route('medecin.dashboard'),
                'super_admin' => route('admin.dashboard'),
                default => '/',
            };

            return response()->json(['redirect' => $redirect]);
        }

        return response()->json([
            'message' => 'Email ou mot de passe incorrect.',
        ], 401);
    }

    /**
     * Handle logout.
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}