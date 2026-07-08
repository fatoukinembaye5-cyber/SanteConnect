<?php

namespace Database\Factories;

use App\Models\Specialite;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Specialite>
 */
class SpecialiteFactory extends Factory
{
    protected $model = Specialite::class;

    public function definition(): array
    {
        return [
            'nom' => fake()->unique()->randomElement([
                'Cardiologie',
                'Dermatologie',
                'Pédiatrie',
                'Gynécologie',
                'Ophtalmologie',
                'Orthopédie',
            ]),
            'description' => fake()->sentence(10),
        ];
    }
}
