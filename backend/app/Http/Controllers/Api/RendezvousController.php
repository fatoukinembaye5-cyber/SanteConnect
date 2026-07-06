<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RendezVous;

class RendezVousController extends Controller
{
    //  Liste des rendez-vous
    public function index()
    {
        $rendezvous = RendezVous::with(['patient', 'medecin'])
            ->latest()
            ->get();

        return response()->json($rendezvous);
    }

    //  Créer un rendez-vous
    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'medecin_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'heure' => 'required',
            'motif' => 'required|string',
        ]);

        $rdv = RendezVous::create([
            'patient_id' => $request->patient_id,
            'medecin_id' => $request->medecin_id,
            'date' => $request->date,
            'heure' => $request->heure,
            'motif' => $request->motif,
            'statut' => 'en_attente',
        ]);

        return response()->json([
            'message' => 'Rendez-vous créé avec succès',
            'rendezvous' => $rdv
        ]);
    }

    //  Voir un rendez-vous
    public function show($id)
    {
        $rdv = RendezVous::with(['patient', 'medecin'])->findOrFail($id);

        return response()->json($rdv);
    }

    //  Modifier un rendez-vous (statut ou infos)
    public function update(Request $request, $id)
    {
        $rdv = RendezVous::findOrFail($id);

        $rdv->update($request->only([
            'date',
            'heure',
            'motif',
            'statut'
        ]));

        return response()->json([
            'message' => 'Rendez-vous mis à jour',
            'rendezvous' => $rdv
        ]);
    }

    //  Supprimer un rendez-vous
    public function destroy($id)
    {
        $rdv = RendezVous::findOrFail($id);
        $rdv->delete();

        return response()->json([
            'message' => 'Rendez-vous supprimé'
        ]);
    }

    //  Rendez-vous du patient connecté
    public function mesRendezVous(Request $request)
    {
        $rdv = RendezVous::where('patient_id', $request->user()->id)
            ->with('medecin')
            ->latest()
            ->get();

        return response()->json($rdv);
    }

    //  Rendez-vous du médecin connecté
    public function rendezVousMedecin(Request $request)
    {
        $rdv = RendezVous::where('medecin_id', $request->user()->id)
            ->with('patient')
            ->latest()
            ->get();

        return response()->json($rdv);
    }
}