import axios from 'axios';

// Création de l'instance Axios
const axiosClient = axios.create({
    // L'URL de base pointe vers votre serveur Laravel
    baseURL: 'http://127.0.0.1:8000/api',
    
    // Indispensable pour que Laravel accepte les cookies/sessions
    withCredentials: true, 
    
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default axiosClient;