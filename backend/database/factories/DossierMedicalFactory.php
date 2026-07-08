<?php

namespace Database\Factories;

use App\Models\DossierMedical;
use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DossierMedical>
 */
class DossierMedicalFactory extends Factory
{
    protected $model = DossierMedical::class;

    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'antecedents' => fake()->paragraph(),
            'allergies' => fake()->sentence(),
            'group_sanguin' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'notes' => fake()->paragraph(),
        ];
    }
}
