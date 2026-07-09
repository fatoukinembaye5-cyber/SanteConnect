<?php

namespace Database\Factories;

use App\Models\Rendezvous;
use App\Models\Patient;
use App\Models\Medecin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Rendezvous>
 */
class RendezvousFactory extends Factory
{
    protected $model = Rendezvous::class;

    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'medecin_id' => Medecin::factory(),
            'date_rendezvous' => fake()->dateTimeBetween('-1 week', '+1 month')->format('Y-m-d'),
            'heure_rendezvous' => fake()->time('H:i'),
            'motif' => fake()->randomElement([
                'Consultation générale',
                'Suivi de traitement',
                'Contrôle résultat',
                'Vaccination',
            ]),
            'statut' => fake()->randomElement([
                'en_attente',
                'confirme',
                'annule',
                'termine',
            ]),
        ];
    }
}
