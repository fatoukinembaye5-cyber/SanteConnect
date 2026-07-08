<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Consultation;

class ConsultationController extends Controller
{
    //  Liste des consultations
    public function index()
    {
        $consultations = Consultation::with(['patient', 'medecin'])->latest()->get();

        return response()->json($consultations);
    }

    //  Créer une consultation
    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'medecin_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'motif' => 'required|string',
            'notes' => 'nullable|string'
        ]);

        $consultation = Consultation::create([
            'patient_id' => $request->patient_id,
            'medecin_id' => $request->medecin_id,
            'date' => $request->date,
            'motif' => $request->motif,
            'notes' => $request->notes,
            'statut' => 'en_attente'
        ]);

        return response()->json([
            'message' => 'Consultation créée avec succès',
            'consultation' => $consultation
        ]);
    }

    //  Voir une consultation
    public function show($id)
    {
        $consultation = Consultation::with(['patient', 'medecin'])->findOrFail($id);

        return response()->json($consultation);
    }

    //  Modifier une consultation
    public function update(Request $request, $id)
    {
        $consultation = Consultation::findOrFail($id);

        $consultation->update($request->only([
            'date',
            'motif',
            'notes',
            'statut'
        ]));

        return response()->json([
            'message' => 'Consultation mise à jour',
            'consultation' => $consultation
        ]);
    }

    //  Supprimer une consultation
    public function destroy($id)
    {
        $consultation = Consultation::findOrFail($id);
        $consultation->delete();

        return response()->json([
            'message' => 'Consultation supprimée'
        ]);
    }
}