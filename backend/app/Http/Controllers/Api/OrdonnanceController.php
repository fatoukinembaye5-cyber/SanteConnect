<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ordonnance;

class OrdonnanceController extends Controller
{
    //  Liste des ordonnances
    public function index()
    {
        $ordonnances = Ordonnance::with(['patient', 'medecin'])
            ->latest()
            ->get();

        return response()->json($ordonnances);
    }

    //  Créer une ordonnance
    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'medecin_id' => 'required|exists:users,id',
            'description' => 'required|string',
            'medicaments' => 'required|string',
            'date' => 'required|date'
        ]);

        $ordonnance = Ordonnance::create([
            'patient_id' => $request->patient_id,
            'medecin_id' => $request->medecin_id,
            'description' => $request->description,
            'medicaments' => $request->medicaments,
            'date' => $request->date,
        ]);

        return response()->json([
            'message' => 'Ordonnance créée avec succès',
            'ordonnance' => $ordonnance
        ]);
    }

    //  Voir une ordonnance
    public function show($id)
    {
        $ordonnance = Ordonnance::with(['patient', 'medecin'])->findOrFail($id);

        return response()->json($ordonnance);
    }

    //  Modifier une ordonnance
    public function update(Request $request, $id)
    {
        $ordonnance = Ordonnance::findOrFail($id);

        $ordonnance->update($request->only([
            'description',
            'medicaments',
            'date'
        ]));

        return response()->json([
            'message' => 'Ordonnance mise à jour',
            'ordonnance' => $ordonnance
        ]);
    }

    //  Supprimer une ordonnance
    public function destroy($id)
    {
        $ordonnance = Ordonnance::findOrFail($id);
        $ordonnance->delete();

        return response()->json([
            'message' => 'Ordonnance supprimée'
        ]);
    }
}