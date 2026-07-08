<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    public function envoyer($userId, $titre, $message)
    {
        return Notification::create([
            'user_id' => $userId,
            'titre' => $titre,
            'message' => $message,
            'lu' => false
        ]);
    }

    public function notificationsUser($userId)
    {
        return Notification::where('user_id', $userId)
            ->latest()
            ->get();
    }

    public function marquerCommeLu($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->lu = true;
        $notification->save();

        return $notification;
    }
}