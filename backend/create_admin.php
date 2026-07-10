<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$user = User::where('email', 'admin@santeconnect.sn')->first();
if (!$user) {
    $user = new User();
    $user->name = 'Admin Test';
    $user->email = 'admin@santeconnect.sn';
    $user->password = bcrypt('thies2024');
    $user->role = 'administrateur';
    $user->save();
    echo "Created admin user ID={$user->id}\n";
} else {
    $user->password = bcrypt('thies2024');
    $user->role = 'administrateur';
    $user->save();
    echo "Updated admin user ID={$user->id}\n";
}
