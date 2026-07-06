<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Planning extends Model
{
    use HasFactory;

    protected $fillable = [
        'medecin_id',
        'date',
        'start_time',
        'end_time',
        'is_available',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
        'is_available' => 'boolean',
    ];

    /**
     * Get the doctor associated with the planning slot.
     */
    public function medecin(): BelongsTo
    {
        return $this->belongsTo(Medecin::class, 'medecin_id');
    }
}
