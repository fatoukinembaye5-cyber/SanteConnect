<?php

namespace Database\Factories;

use App\Models\Consultation;
use App\Models\Patient;
use App\Models\Medecin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Consultation>
 */
class ConsultationFactory extends Factory
{
    protected $model = Consultation::class;

    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'medecin_id' => Medecin::factory(),
            'date' => fake()->dateTimeBetween('-2 months', 'now')->format('Y-m-d H:i:s'),
            'motif' => fake()->sentence(4),
            'notes' => fake()->paragraph(),
            'statut' => fake()->randomElement(['en_attente', 'en_cours', 'terminee', 'annulee']),
        ];
    }
}
