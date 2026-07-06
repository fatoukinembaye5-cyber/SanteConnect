<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'nom',
        'prenom',
        'date_naissance',
        'sexe',
        'telephone',
        'adresse',
        'notes_medicales',
    ]; 
     protected $casts = ['date_naissance' => 'date',];
    /*
     * Get the user account associated with the patient.
     */
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }

    /**
     * Get the appointments for the patient.
     */
    public function rendezVous(): HasMany
    {
        return $this->hasMany(RendezVous::class, 'patient_id');
    }

    /**
     * Get the medical records (dossiers) for the patient.
     */
    public function dossiers(): HasMany
    {
        return $this->hasMany(Dossier::class, 'patient_id');
    }

    /**
     * Get the prescriptions (ordonnances) for the patient.
     */
    public function ordonnances(): HasMany
    {
        return $this->hasMany(Ordonnance::class, 'patient_id');
    }
}
