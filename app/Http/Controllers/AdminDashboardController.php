<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Patient;
use App\Models\Medecin;
use App\Models\RendezVous;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_patients' => Patient::count(),
            'total_medecins' => Medecin::count(),
            'total_appointments' => RendezVous::count(),
        ];

        $medecins = Medecin::with('utilisateur')->latest()->get();
        $patients = Patient::with('utilisateur')->latest()->get();

        return view('admin.dashboard', compact('stats', 'medecins', 'patients'));
    }

    /**
     * Toggle doctor active status.
     */
    public function toggleDoctorStatus($id)
    {
        $medecin = Medecin::findOrFail($id);
        $newStatus = $medecin->statut === 'actif' ? 'inactif' : 'actif';

        $medecin->update([
            'statut' => $newStatus,
        ]);

        return redirect()->route('admin.dashboard')->with('success', 'Le statut du médecin a été mis à jour avec succès (nouveau statut : ' . $newStatus . ').');
    }
}
