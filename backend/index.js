const express = require('express');
const cors = require('cors');

const {musicRoutes, seasonRoutes, artistRoutes} = require("./src/routes");

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', // Remplacez par le domaine de votre frontend
    methods: ['GET', 'POST', 'PUT'], // Liste des méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // Liste des en-têtes autorisés
};

app.use(cors(corsOptions));

app.set('case sensitive routing', false);

const APIRouter = express.Router();
app.use('/api', APIRouter);

APIRouter.get('/version', function(req, res) {
    const { version } = require('./package.json');

    return res.json({ version })
})

APIRouter.use('/playlists', musicRoutes);
APIRouter.use('/seasons', seasonRoutes);
APIRouter.use('/playlists/:artistName', artistRoutes)

app.listen(8080, function() {
    console.log('API is running on port 8080');
})



 /* GET SPOTIFY TOKEN */
const bodyParser = require('body-parser');
const axios = require('axios');
const artistRouter = require('./src/routes/artistRoutes');

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

// Middleware pour parser les données de requête HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Endpoint pour obtenir un jeton d'accès
app.post('/token', (req, res) => {
  // Options de requête pour obtenir un jeton d'accès
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  // Faire une requête HTTP POST pour obtenir un jeton d'accès
  axios.post(authOptions.url, null, {
    params: authOptions.form,
    headers: authOptions.headers
  }).then(response => {
    if (response.status === 200) {
      // Envoyer le jeton d'accès dans la réponse HTTP
      res.json({ token: response.data.access_token });
    } else {
      // Envoyer un code d'erreur HTTP si la requête a échoué
      res.status(response.status).send(response.statusText);
    }
  }).catch(error => {
    // Envoyer un code d'erreur HTTP si la requête a échoué
    res.status(error.response.status).send(error.response.statusText);
  });
});
// Lancer le serveur sur le port 8080
app.listen(8081, () => {
  console.log('Serveur lancé sur le port 8080');
});


async function getToken() {
  let response;
  try { 
    response = await axios.post('http://localhost:8080/token');
    console.log(response.data.token)
  } catch (error) {
    console.log(error.response.status + ' ' + error.response.statusText);
  }
}

getToken();
