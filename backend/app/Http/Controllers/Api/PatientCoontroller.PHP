<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class PatientController extends Controller
{
    //  Liste des patients
    public function index()
    {
        $patients = User::where('role', 'patient')->latest()->get();

        return response()->json($patients);
    }

    //  Créer un patient (admin ou inscription)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'telephone' => 'nullable|string',
            'adresse' => 'nullable|string',
        ]);

        $patient = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'patient',
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
        ]);

        return response()->json([
            'message' => 'Patient créé avec succès',
            'patient' => $patient
        ]);
    }

    //  Voir un patient
    public function show($id)
    {
        $patient = User::where('role', 'patient')->findOrFail($id);

        return response()->json($patient);
    }

    //  Modifier un patient
    public function update(Request $request, $id)
    {
        $patient = User::where('role', 'patient')->findOrFail($id);

        $patient->update($request->only([
            'name',
            'email',
            'telephone',
            'adresse'
        ]));

        return response()->json([
            'message' => 'Patient mis à jour',
            'patient' => $patient
        ]);
    }

    //  Supprimer un patient
    public function destroy($id)
    {
        $patient = User::where('role', 'patient')->findOrFail($id);
        $patient->delete();

        return response()->json([
            'message' => 'Patient supprimé'
        ]);
    }

    //  Profil patient connecté
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
}