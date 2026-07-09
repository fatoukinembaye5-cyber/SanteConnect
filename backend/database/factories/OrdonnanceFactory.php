<?php

namespace Database\Factories;

use App\Models\Ordonnance;
use App\Models\Patient;
use App\Models\Medecin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ordonnance>
 */
class OrdonnanceFactory extends Factory
{
    protected $model = Ordonnance::class;

    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'medecin_id' => Medecin::factory(),
            'description' => fake()->sentence(8),
            'medicaments' => fake()->sentence(6),
            'date' => fake()->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),
        ];
    }
}
