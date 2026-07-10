<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rendezvous;

class RendezvousController extends Controller
{
    //  Liste des rendez-vous
    public function index()
    {
        $rendezvous = Rendezvous::with(['patient', 'medecin'])
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
            'date_rendezvous' => 'required|date',
            'heure_rendezvous' => 'required',
            'motif' => 'required|string',
        ]);

        $rdv = Rendezvous::create([
            'patient_id' => $request->patient_id,
            'medecin_id' => $request->medecin_id,
            'date_rendezvous' => $request->date_rendezvous,
            'heure_rendezvous' => $request->heure_rendezvous,
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
        $rdv = Rendezvous::with(['patient', 'medecin'])->findOrFail($id);

        return response()->json($rdv);
    }

    //  Modifier un rendez-vous (statut ou infos)
    public function update(Request $request, $id)
    {
        $rdv = Rendezvous::findOrFail($id);

        $rdv->update($request->only([
            'date_rendezvous',
            'heure_rendezvous',
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
        $rdv = Rendezvous::findOrFail($id);
        $rdv->delete();

        return response()->json([
            'message' => 'Rendez-vous supprimé'
        ]);
    }

    //  Rendez-vous du patient connecté
    public function mesRendezVous(Request $request)
    {
        $rdv = Rendezvous::where('patient_id', $request->user()->id)
            ->with('medecin')
            ->latest()
            ->get();

        return response()->json($rdv);
    }

    //  Rendez-vous du médecin connecté
    public function rendezVousMedecin(Request $request)
    {
        $rdv = Rendezvous::where('medecin_id', $request->user()->id)
            ->with('patient')
            ->latest()
            ->get();

        return response()->json($rdv);
    }
}