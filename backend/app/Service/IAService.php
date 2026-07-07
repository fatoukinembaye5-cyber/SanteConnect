<?php

namespace App\Services;

class AIService
{
    public function analyserSymptomes($data)
    {
        // Exemple logique IA simple (ou appel API OpenAI plus tard)
        if (str_contains($data['symptomes'], 'fièvre')) {
            return "Possible infection virale";
        }

        return "Analyse médicale requise";
    }
}