<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Administrateur extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'niveau',
        'permissions',
    ];

    /**
     * Get the user account associated with the administrator.
     */
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }
}
