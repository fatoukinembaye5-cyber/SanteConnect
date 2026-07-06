<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Patient;
use App\Models\Medecin;
use App\Models\Administrateur;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Administrateur
        $adminUser = User::create([
            'name' => 'Admin SanteConnect',
            'email' => 'admin@santeconnect.fr',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
        ]);
        
        Administrateur::create([
            'utilisateur_id' => $adminUser->id,
            'niveau' => 'super_admin',
            'permissions' => 'all',
        ]);

        // 2. Seed Médecin
        $medecinUser = User::create([
            'name' => 'Dr. Dupont Jean',
            'email' => 'dr.dupont@santeconnect.fr',
            'password' => Hash::make('password'),
            'role' => 'medecin',
        ]);

        Medecin::create([
            'utilisateur_id' => $medecinUser->id,
            'specialite' => 'Généraliste',
            'matricule' => '10101234567',
            'telephone' => '0144556677',
            'cabinet' => 'Cabinet Saint-Germain',
            'adresse' => '15 Rue de Rennes, 75006 Paris',
            'statut' => 'actif',
        ]);

        // 3. Seed Patient
        $patientUser = User::create([
            'name' => 'JeanDupont',
            'email' => 'jean.dupont@santeconnect.fr',
            'password' => Hash::make('password'),
            'role' => 'patient',
        ]);

        Patient::create([
            'utilisateur_id' => $patientUser->id,
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'date_naissance' => '1985-06-15',
            'sexe' => 'M',
            'telephone' => '0612345678',
            'adresse' => '24 Avenue des Champs-Élysées, 75008 Paris',
            'notes_medicales' => 'Allergique à la Pénicilline.',
        ]);
    }
}
