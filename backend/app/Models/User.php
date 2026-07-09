<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'nom',
        'prenom',
        'email',
        'password',
        'role',
        'telephone',
        'api_token',
    ];

    /**
     * Accessor for the full name when controllers submit a single name field.
     */
    public function getNameAttribute(): string
    {
        return trim(($this->prenom ?? '') . ' ' . ($this->nom ?? ''));
    }

    /**
     * Mutator to support controllers that pass a single name field.
     */
    public function setNameAttribute(string $value): void
    {
        $parts = preg_split('/\s+/', trim($value));
        if (count($parts) <= 1) {
            $this->attributes['prenom'] = $parts[0] ?? '';
            $this->attributes['nom'] = '';
            return;
        }

        $this->attributes['prenom'] = array_shift($parts);
        $this->attributes['nom'] = implode(' ', $parts);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'api_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];
}