<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Medecin extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'specialite',
        'matricule',
        'telephone',
        'cabinet',
        'adresse',
        'statut',
    ];

    /**
     * Get the user account associated with the doctor.
     */
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }

    /**
     * Get the appointments for the doctor.
     */
    public function rendezVous(): HasMany
    {
        return $this->hasMany(RendezVous::class, 'medecin_id');
    }

    /**
     * Get the plannings (availabilities) for the doctor.
     */
    public function plannings(): HasMany
    {
        return $this->hasMany(Planning::class, 'medecin_id');
    }

    /**
     * Get the medical records (dossiers) created by the doctor.
     */
    public function dossiers(): HasMany
    {
        return $this->hasMany(Dossier::class, 'medecin_id');
    }

    /**
     * Get the prescriptions (ordonnances) written by the doctor.
     */
    public function ordonnances(): HasMany
    {
        return $this->hasMany(Ordonnance::class, 'medecin_id');
    }
}
