<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dossier extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'medecin_id',
        'titre',
        'description',
        'type',
        'date_creation',
    ];

    protected $casts = [
        'date_creation' => 'date',
    ];

    /**
     * Get the patient associated with the medical file.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    /**
     * Get the doctor who created/manages this medical file.
     */
    public function medecin(): BelongsTo
    {
        return $this->belongsTo(Medecin::class, 'medecin_id');
    }

    /**
     * Get the prescriptions associated with this medical file.
     */
    public function ordonnances(): HasMany
    {
        return $this->hasMany(Ordonnance::class, 'dossier_id');
    }
}
