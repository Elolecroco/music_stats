const { Router } = require("express");
const { MusicController } = require("../controllers");

const musicRouter = Router();

musicRouter.get('', (req, res) => new MusicController(req, res).getAll());
musicRouter.get('/:id', (req, res) => new MusicController(req, res).getById());
musicRouter.post('', (req, res) => new MusicController(req, res).addTrack());
musicRouter.delete('/:id', (req, res) => new MusicController(req, res).deleteTrack());
musicRouter.put('/:id', (req, res) => new MusicController(req, res).updateTrack());

module.exports = musicRouter;