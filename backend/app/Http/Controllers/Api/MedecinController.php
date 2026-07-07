<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class MedecinController extends Controller
{
    //  Liste de tous les médecins
    public function index()
    {
        $medecins = User::where('role', 'medecin')->latest()->get();

        return response()->json($medecins);
    }

    //  Créer un médecin (si admin ajoute un médecin)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'specialite' => 'nullable|string',
            'telephone' => 'nullable|string',
        ]);

        $medecin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'medecin',
            'specialite' => $request->specialite,
            'telephone' => $request->telephone,
        ]);

        return response()->json([
            'message' => 'Médecin créé avec succès',
            'medecin' => $medecin
        ]);
    }

    //  Voir un médecin
    public function show($id)
    {
        $medecin = User::where('role', 'medecin')->findOrFail($id);

        return response()->json($medecin);
    }

    //  Modifier un médecin
    public function update(Request $request, $id)
    {
        $medecin = User::where('role', 'medecin')->findOrFail($id);

        $medecin->update($request->only([
            'name',
            'email',
            'specialite',
            'telephone'
        ]));

        return response()->json([
            'message' => 'Médecin mis à jour',
            'medecin' => $medecin
        ]);
    }

    //  Supprimer un médecin
    public function destroy($id)
    {
        $medecin = User::where('role', 'medecin')->findOrFail($id);
        $medecin->delete();

        return response()->json([
            'message' => 'Médecin supprimé'
        ]);
    }

    //  Profil médecin connecté
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
}