<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medecin extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom',
        'prenom',
        'telephone',
        'email',
        'specialite',
        'numero_ordre',
        'description',
        'disponible'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function specialite()
    {
        return $this->belongsTo(Specialite::class);
    }

    public function rendezvous()
    {
        return $this->hasMany(Rendezvous::class);
    }

    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }

    public function disponibilites()
    {
        return $this->hasMany(Disponibilite::class);
    }
}