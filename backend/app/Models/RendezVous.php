<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rendezvous extends Model
{
    use HasFactory;

    protected $table = 'rendezvous';

    protected $fillable = [
        'patient_id',
        'medecin_id',
        'date_rendezvous',
        'heure_rendezvous',
        'motif',
        'statut',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function medecin()
    {
        return $this->belongsTo(Medecin::class);
    }
}
