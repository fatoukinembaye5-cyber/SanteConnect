<?php

namespace Database\Factories;

use App\Models\Medecin;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Medecin>
 */
class MedecinFactory extends Factory
{
    protected $model = Medecin::class;

    public function definition(): array
    {
        $firstName = fake()->firstName();
        $lastName = fake()->lastName();

        return [
            'user_id' => User::factory()->medecin(),
            'nom' => $lastName,
            'prenom' => $firstName,
            'telephone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'specialite' => fake()->randomElement([
                'Cardiologie',
                'Dermatologie',
                'Gynécologie',
                'Neurologie',
            ]),
            'numero_ordre' => fake()->unique()->numerify('MD-#####'),
            'description' => fake()->sentence(12),
            'disponible' => fake()->boolean(75),
        ];
    }
}
