<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Specialite;

class SpecialiteController extends Controller
{
    //  Liste des spécialités
    public function index()
    {
        $specialites = Specialite::with('medecins')->latest()->get();

        return response()->json($specialites);
    }

    //  Créer une spécialité
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|unique:specialites',
            'description' => 'nullable|string',
        ]);

        $specialite = Specialite::create([
            'nom' => $request->nom,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Spécialité créée avec succès',
            'specialite' => $specialite
        ]);
    }

    //  Voir une spécialité
    public function show($id)
    {
        $specialite = Specialite::with('medecins')->findOrFail($id);

        return response()->json($specialite);
    }

    //  Modifier une spécialité
    public function update(Request $request, $id)
    {
        $specialite = Specialite::findOrFail($id);

        $specialite->update($request->only([
            'nom',
            'description'
        ]));

        return response()->json([
            'message' => 'Spécialité mise à jour',
            'specialite' => $specialite
        ]);
    }

    //  Supprimer une spécialité
    public function destroy($id)
    {
        $specialite = Specialite::findOrFail($id);
        $specialite->delete();

        return response()->json([
            'message' => 'Spécialité supprimée'
        ]);
    }
}