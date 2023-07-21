const { Router } = require("express");
const { ArtistController } = require("../controllers");

const artistRouter = Router();

artistRouter.get('/playlists/:artistName', (req, res) => new ArtistController(req, res).getAllArtistSongs());

module.exports = artistRouter;