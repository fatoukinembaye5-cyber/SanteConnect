<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DossierMedical extends Model
{
    use HasFactory;

    protected $table = 'dossier_medicaux';

    protected $fillable = [
        'patient_id',
        'antecedents',
        'allergies',
        'group_sanguin',
        'notes'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}