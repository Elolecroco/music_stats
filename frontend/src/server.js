import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // URL de base de votre backend
  timeout: 5000, // Délai d'attente pour les requêtes (en millisecondes)
  // Vous pouvez également ajouter d'autres configurations ici
});

export default axiosInstance;
