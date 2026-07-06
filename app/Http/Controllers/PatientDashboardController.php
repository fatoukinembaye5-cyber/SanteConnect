<?php

namespace App\Http\Controllers;

use App\Models\Medecin;
use App\Models\RendezVous;
use App\Models\Ordonnance;
use App\Models\Dossier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientDashboardController extends Controller
{
    /**
     * Display the patient dashboard.
     */
    public function index()
    {
        $patient = Auth::user()->patient;

        // If the patient profile does not exist for some reason, create it or redirect
        if (!$patient) {
            return redirect('/')->with('error', 'Profil patient non trouvé.');
        }

        // Fetch patient data
        $rendezVous = $patient->rendezVous()->with('medecin.utilisateur')->orderBy('scheduled_at', 'asc')->get();
        $ordonnances = $patient->ordonnances()->with('medecin.utilisateur')->latest()->get();
        $dossiers = $patient->dossiers()->with('medecin.utilisateur')->latest()->get();

        // Fetch list of active doctors for the booking dropdown
        $medecins = Medecin::with('utilisateur')->where('statut', 'actif')->get();

        return view('patient.dashboard', compact('patient', 'rendezVous', 'ordonnances', 'dossiers', 'medecins'));
    }

    /**
     * Book a new appointment.
     */
    public function bookAppointment(Request $request)
    {
        $request->validate([
            'medecin_id' => 'required|exists:medecins,id',
            'scheduled_at' => 'required|date|after:now',
            'motif' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $patient = Auth::user()->patient;

        RendezVous::create([
            'patient_id' => $patient->id,
            'medecin_id' => $request->medecin_id,
            'scheduled_at' => $request->scheduled_at,
            'motif' => $request->motif,
            'notes' => $request->notes,
            'statut' => 'en_attente', // default status
        ]);

        return redirect()->route('patient.dashboard')->with('success', 'Rendez-vous réservé avec succès ! En attente de confirmation.');
    }
}
