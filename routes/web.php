<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\PatientDashboardController;
use App\Http\Controllers\MedecinDashboardController;
use App\Http\Controllers\AdminDashboardController;

// 1. Home redirection
Route::get('/', function () {
    if (auth()->check()) {
        $role = auth()->user()->role;
        if ($role === 'patient') {
            return redirect()->route('patient.dashboard');
        } elseif ($role === 'medecin') {
            return redirect()->route('medecin.dashboard');
        } elseif ($role === 'super_admin') {
            return redirect()->route('admin.dashboard');
        }
    }
    return redirect()->route('login');
});

// 2. Authentication Routes (for guests only)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register/patient', [RegisterController::class, 'showRegisterPatient'])->name('register.patient');
    Route::post('/register/patient', [RegisterController::class, 'registerPatient']);

    Route::get('/register/medecin', [RegisterController::class, 'showRegisterMedecin'])->name('register.medecin');
    Route::post('/register/medecin', [RegisterController::class, 'registerMedecin']);
});

// Logout route (accessible by authenticated users)
Route::any('/logout', [AuthController::class, 'logout'])->name('logout');

// 3. Patient Portal (restricted to authenticated users with role "patient")
Route::middleware(['auth', 'role:patient'])->prefix('patient')->name('patient.')->group(function () {
    Route::get('/dashboard', [PatientDashboardController::class, 'index'])->name('dashboard');
    Route::post('/rendez-vous', [PatientDashboardController::class, 'bookAppointment'])->name('rendezvous.store');
});

// 4. Doctor Portal (restricted to authenticated users with role "medecin")
Route::middleware(['auth', 'role:medecin'])->prefix('medecin')->name('medecin.')->group(function () {
    Route::get('/dashboard', [MedecinDashboardController::class, 'index'])->name('dashboard');
    Route::post('/planning', [MedecinDashboardController::class, 'addPlanning'])->name('planning.store');
    Route::post('/ordonnance', [MedecinDashboardController::class, 'writePrescription'])->name('ordonnance.store');
    Route::post('/rendez-vous/{id}/status', [MedecinDashboardController::class, 'updateAppointmentStatus'])->name('rendezvous.status');
});

// 5. Admin Portal (restricted to authenticated users with role "super_admin")
Route::middleware(['auth', 'role:super_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::post('/medecin/{id}/toggle', [AdminDashboardController::class, 'toggleDoctorStatus'])->name('medecin.toggle');
});
