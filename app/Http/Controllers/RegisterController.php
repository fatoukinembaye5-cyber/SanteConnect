<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Patient;
use App\Models\Medecin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    /**
     * Show patient registration form.
     */
    public function showRegisterPatient()
    {
        return view('auth.register-patient');
    }

    /**
     * Handle patient registration.
     */
    public function registerPatient(Request $request)
    {
        // 1. Validate the input fields
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs,email',
            'password' => 'required|string|min:8|confirmed',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'date_naissance' => 'nullable|date',
            'sexe' => 'nullable|string|in:M,F',
            'telephone' => ['nullable', 'string', 'regex:/^(\+221|00221)?(77|78|76|70|75|33)[0-9]{7}$/'],
            'adresse' => 'required|string', // address is required now
        ], [
            'telephone.regex' => 'Le numéro de téléphone doit être un numéro sénégalais valide (ex: +221 77 123 45 67 ou 771234567).',
            'adresse.required' => 'L\'adresse de résidence est obligatoire.',
        ]);

        // 2. Use a Database Transaction to ensure both records are created successfully
        DB::beginTransaction();

        try {
            // Create user account
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'patient', // Enforce patient role
            ]);

            // Create patient profile
            Patient::create([
                'utilisateur_id' => $user->id,
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'date_naissance' => $request->date_naissance,
                'sexe' => $request->sexe,
                'telephone' => $request->telephone,
                'adresse' => $request->adresse,
            ]);

            DB::commit();

            // Log the user in
            Auth::login($user);

            return redirect('/patient/dashboard')->with('success', 'Votre compte patient a été créé avec succès !');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Une erreur est survenue lors de la création du compte : ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Show doctor registration form.
     */
    public function showRegisterMedecin()
    {
        return view('auth.register-medecin');
    }

    /**
     * Handle doctor registration.
     */
    public function registerMedecin(Request $request)
    {
        // 1. Validate the input fields
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs,email',
            'password' => 'required|string|min:8|confirmed',
            'specialite' => 'nullable|string|max:255',
            'matricule' => 'required|string|unique:medecins,matricule|max:255',
            'telephone' => ['nullable', 'string', 'regex:/^(\+221|00221)?(77|78|76|70|75|33)[0-9]{7}$/'],
            'cabinet' => 'nullable|string|max:255',
            'adresse' => 'required|string', // address is required now
        ], [
            'telephone.regex' => 'Le numéro de téléphone doit être un numéro sénégalais professionnel valide (ex: +221 77 123 45 67 ou 771234567).',
            'adresse.required' => 'L\'adresse du cabinet est obligatoire.',
        ]);

        // 2. Database Transaction
        DB::beginTransaction();

        try {
            // Create user account
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'medecin', // Enforce doctor role
            ]);

            // Create doctor profile
            Medecin::create([
                'utilisateur_id' => $user->id,
                'specialite' => $request->specialite,
                'matricule' => $request->matricule,
                'telephone' => $request->telephone,
                'cabinet' => $request->cabinet,
                'adresse' => $request->adresse,
                'statut' => 'actif',
            ]);

            DB::commit();

            // Log the user in
            Auth::login($user);

            return redirect('/medecin/dashboard')->with('success', 'Votre compte médecin a été créé avec succès !');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Une erreur est survenue lors de la création du compte : ' . $e->getMessage()])->withInput();
        }
    }
}
