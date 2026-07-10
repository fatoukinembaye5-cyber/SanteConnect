<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\MedecinController;
use App\Http\Controllers\Api\RendezvousController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\OrdonnanceController;
use App\Http\Controllers\Api\DossierMedicalController;
use App\Http\Controllers\Api\TableauBordController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\SpecialiteController;
use App\Http\Controllers\Api\DisponibiliteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ==================== AUTHENTIFICATION ====================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // ==================== PATIENTS ====================

    Route::apiResource('patients', PatientController::class);

    // ==================== MEDECINS ====================

    Route::apiResource('medecins', MedecinController::class);

    // ==================== RENDEZ-VOUS ====================

    Route::get('/rendezvous/mes', [RendezvousController::class, 'mesRendezVous']);
    Route::get('/rendezvous/medecin', [RendezvousController::class, 'rendezVousMedecin']);
    Route::apiResource('rendezvous', RendezvousController::class);

    // ==================== CONSULTATIONS ====================

    Route::apiResource('consultations', ConsultationController::class);

    // ==================== DOSSIERS MEDICAUX ====================

    Route::apiResource('dossiers-medicaux', DossierMedicalController::class);

    // ==================== ORDONNANCES ====================

    Route::apiResource('ordonnances', OrdonnanceController::class);

    // ==================== TABLEAU DE BORD ====================

    Route::get('/dashboard', [TableauBordController::class, 'index']);

    // ==================== SPECIALITES ====================

    Route::apiResource('specialites', SpecialiteController::class);

    // ==================== DISPONIBILITES ====================

    Route::apiResource('disponibilites', DisponibiliteController::class);

    // ==================== NOTIFICATIONS ====================

    Route::apiResource('notifications', NotificationController::class);

});