<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rendezvous;
use App\Models\Consultation;
use App\Models\Ordonnance;
use App\Models\DossierMedical;

class TableauBordController extends Controller
{
    //  Dashboard principal
    public function index(Request $request)
    {
        $user = $request->user();

        //  ADMIN DASHBOARD
        if ($user->role === 'admin') {
            return response()->json([
                'total_patients' => User::where('role', 'patient')->count(),
                'total_medecins' => User::where('role', 'medecin')->count(),
                'total_rendezvous' => Rendezvous::count(),
                'total_consultations' => Consultation::count(),
                'total_ordonnances' => Ordonnance::count(),
            ]);
        }

        //  MEDECIN DASHBOARD
        if ($user->role === 'medecin') {
            return response()->json([
                'mes_rendezvous' => Rendezvous::where('medecin_id', $user->id)->count(),
                'mes_consultations' => Consultation::where('medecin_id', $user->id)->count(),
                'mes_ordonnances' => Ordonnance::where('medecin_id', $user->id)->count(),
                'patients_uniques' => Rendezvous::where('medecin_id', $user->id)
                    ->distinct('patient_id')
                    ->count('patient_id'),
            ]);
        }

        //  PATIENT DASHBOARD
        if ($user->role === 'patient') {
            return response()->json([
                'mes_rendezvous' => Rendezvous::where('patient_id', $user->id)->count(),
                'mes_consultations' => Consultation::where('patient_id', $user->id)->count(),
                'mes_ordonnances' => Ordonnance::where('patient_id', $user->id)->count(),
                'mon_dossier' => DossierMedical::where('patient_id', $user->id)->exists(),
            ]);
        }

        return response()->json([
            'message' => 'Rôle non reconnu'
        ], 403);
    }
}