<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_creates_user_and_returns_token(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Jean Dupont',
            'email' => 'jean.dupont@example.com',
            'password' => 'password',
            'role' => 'patient',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'access_token',
            'token_type',
            'user' => ['id', 'email', 'role'],
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'jean.dupont@example.com',
            'role' => 'patient',
        ]);
    }

    public function test_login_with_valid_credentials_returns_token(): void
    {
        $user = User::factory()->create([
            'nom' => 'Marie',
            'prenom' => 'Curie',
            'email' => 'marie.curie@example.com',
            'password' => bcrypt('password'),
            'role' => 'patient',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'marie.curie@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'access_token',
            'token_type',
            'user' => ['id', 'email', 'role'],
        ]);
    }

    public function test_login_with_invalid_credentials_fails(): void
    {
        User::factory()->create([
            'nom' => 'Alan',
            'prenom' => 'Turing',
            'email' => 'alan.turing@example.com',
            'password' => bcrypt('password'),
            'role' => 'patient',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'alan.turing@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(401);
        $response->assertJson([ 'message' => 'Identifiants incorrects' ]);
    }

    public function test_authenticated_user_can_fetch_profile(): void
    {
        $user = User::factory()->create([
            'api_token' => 'test-token',
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer test-token',
        ])->getJson('/api/me');

        $response->assertStatus(200);
        $response->assertJson([ 'id' => $user->id, 'email' => $user->email, 'role' => $user->role ]);
    }

    public function test_authenticated_user_can_logout(): void
    {
        $user = User::factory()->create([
            'api_token' => 'logout-token',
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer logout-token',
        ])->postJson('/api/logout');

        $response->assertStatus(200);
        $response->assertJson([ 'message' => 'Déconnexion réussie' ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => $user->email,
            'api_token' => null,
        ]);
    }
}
