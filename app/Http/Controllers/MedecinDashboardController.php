<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\RendezVous;
use App\Models\Planning;
use App\Models\Ordonnance;
use App\Models\Dossier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MedecinDashboardController extends Controller
{
    /**
     * Display the doctor dashboard.
     */
    public function index()
    {
        $medecin = Auth::user()->medecin;

        if (!$medecin) {
            return redirect('/')->with('error', 'Profil médecin non trouvé.');
        }

        // Fetch doctor's data
        $rendezVous = $medecin->rendezVous()->with('patient')->orderBy('scheduled_at', 'asc')->get();
        $plannings = $medecin->plannings()->orderBy('date', 'asc')->orderBy('start_time', 'asc')->get();
        
        // Fetch all patients in the system to choose from
        $patients = Patient::orderBy('nom', 'asc')->orderBy('prenom', 'asc')->get();

        return view('medecin.dashboard', compact('medecin', 'rendezVous', 'plannings', 'patients'));
    }

    /**
     * Add a planning availability slot.
     */
    public function addPlanning(Request $request)
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'notes' => 'nullable|string',
        ]);

        $medecin = Auth::user()->medecin;

        Planning::create([
            'medecin_id' => $medecin->id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'is_available' => true,
            'notes' => $request->notes,
        ]);

        return redirect()->route('medecin.dashboard')->with('success', 'Plage de disponibilité ajoutée avec succès !');
    }

    /**
     * Write a new prescription.
     */
    public function writePrescription(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'contenu' => 'required|string',
            'date_prescription' => 'required|date',
            'date_expiration' => 'nullable|date|after_or_equal:date_prescription',
        ]);

        $medecin = Auth::user()->medecin;

        // Check if there is an active dossier for this patient
        $dossier = Dossier::where('patient_id', $request->patient_id)->first();

        Ordonnance::create([
            'patient_id' => $request->patient_id,
            'medecin_id' => $medecin->id,
            'dossier_id' => $dossier ? $dossier->id : null,
            'contenu' => $request->contenu,
            'date_prescription' => $request->date_prescription,
            'date_expiration' => $request->date_expiration,
            'statut' => 'active',
        ]);

        return redirect()->route('medecin.dashboard')->with('success', 'Ordonnance rédigée avec succès !');
    }

    /**
     * Update appointment status.
     */
    public function updateAppointmentStatus(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:confirme,annule,termine',
        ]);

        $medecin = Auth::user()->medecin;
        $appointment = RendezVous::where('medecin_id', $medecin->id)->findOrFail($id);

        $appointment->update([
            'statut' => $request->statut,
        ]);

        return redirect()->route('medecin.dashboard')->with('success', 'Statut du rendez-vous mis à jour !');
    }
}
