<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Disponibilite;
use Illuminate\Http\Request;

class DisponibiliteController extends Controller
{
    public function index()
    {
        $disponibilites = Disponibilite::latest()->get();
        return response()->json($disponibilites);
    }

    public function store(Request $request)
    {
        $request->validate([
            'medecin_id' => 'required|integer|exists:users,id',
            'date' => 'required|date',
            'heure_debut' => 'required|string',
            'heure_fin' => 'required|string',
        ]);

        $disponibilite = Disponibilite::create($request->all());

        return response()->json([
            'message' => 'Disponibilité créée avec succès',
            'disponibilite' => $disponibilite
        ]);
    }

    public function show($id)
    {
        $disponibilite = Disponibilite::findOrFail($id);
        return response()->json($disponibilite);
    }

    public function update(Request $request, $id)
    {
        $disponibilite = Disponibilite::findOrFail($id);
        $disponibilite->update($request->all());

        return response()->json([
            'message' => 'Disponibilité mise à jour',
            'disponibilite' => $disponibilite
        ]);
    }

    public function destroy($id)
    {
        $disponibilite = Disponibilite::findOrFail($id);
        $disponibilite->delete();

        return response()->json([
            'message' => 'Disponibilité supprimée'
        ]);
    }
}
