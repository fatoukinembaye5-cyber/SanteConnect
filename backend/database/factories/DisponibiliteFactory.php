<?php

namespace Database\Factories;

use App\Models\Disponibilite;
use App\Models\Medecin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Disponibilite>
 */
class DisponibiliteFactory extends Factory
{
    protected $model = Disponibilite::class;

    public function definition(): array
    {
        $date = fake()->dateTimeBetween('now', '+2 months');
        $start = fake()->dateTimeBetween($date, $date->modify('+1 day'));
        $end = (clone $start)->modify('+1 hour');

        return [
            'medecin_id' => Medecin::factory(),
            'date' => $date->format('Y-m-d'),
            'heure_debut' => $start->format('H:i'),
            'heure_fin' => $end->format('H:i'),
            'disponible' => fake()->boolean(90),
        ];
    }
}
