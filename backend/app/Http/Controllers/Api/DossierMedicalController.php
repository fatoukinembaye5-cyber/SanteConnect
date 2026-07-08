<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DossierMedical;

class DossierMedicalController extends Controller
{
    //  Liste des dossiers médicaux
    public function index()
    {
        $dossiers = DossierMedical::with('patient')->latest()->get();

        return response()->json($dossiers);
    }

    //  Créer un dossier médical
    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'antecedents' => 'nullable|string',
            'allergies' => 'nullable|string',
            'group_sanguin' => 'nullable|string',
            'notes' => 'nullable|string'
        ]);

        $dossier = DossierMedical::create([
            'patient_id' => $request->patient_id,
            'antecedents' => $request->antecedents,
            'allergies' => $request->allergies,
            'group_sanguin' => $request->group_sanguin,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => 'Dossier médical créé avec succès',
            'dossier' => $dossier
        ]);
    }

    //  Voir un dossier médical
    public function show($id)
    {
        $dossier = DossierMedical::with('patient')->findOrFail($id);

        return response()->json($dossier);
    }

    // Modifier un dossier médical
    public function update(Request $request, $id)
    {
        $dossier = DossierMedical::findOrFail($id);

        $dossier->update($request->only([
            'antecedents',
            'allergies',
            'group_sanguin',
            'notes'
        ]));

        return response()->json([
            'message' => 'Dossier médical mis à jour',
            'dossier' => $dossier
        ]);
    }

    // Supprimer un dossier médical
    public function destroy($id)
    {
        $dossier = DossierMedical::findOrFail($id);
        $dossier->delete();

        return response()->json([
            'message' => 'Dossier médical supprimé'
        ]);
    }
}