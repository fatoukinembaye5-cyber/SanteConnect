<?php

namespace Database\Seeders;

use App\Models\Consultation;
use App\Models\DossierMedical;
use App\Models\Disponibilite;
use App\Models\Medecin;
use App\Models\Ordonnance;
use App\Models\Patient;
use App\Models\Rendezvous;
use App\Models\Specialite;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'prenom' => 'Test',
            'nom' => 'User',
            'email' => 'test@example.com',
            'role' => 'patient',
        ]);

        Specialite::factory()->count(5)->create();

        Medecin::factory()->count(5)->create();
        Patient::factory()->count(10)->create();

        Rendezvous::factory()->count(15)->create();
        Consultation::factory()->count(10)->create();
        Ordonnance::factory()->count(8)->create();
        DossierMedical::factory()->count(5)->create();
        Disponibilite::factory()->count(10)->create();
    }
}