const { Router } = require("express");
const { SeasonController } = require("../controllers");

const seasonRouter = Router();

seasonRouter.get('', (req, res) => new SeasonController(req, res).getAll());
seasonRouter.get('/:id', (req, res) => new SeasonController(req, res).getById());
seasonRouter.post('', (req, res) => new SeasonController(req, res).addSeason());
seasonRouter.delete('/:id', (req, res) => new SeasonController(req, res).deleteSeason());
seasonRouter.put('/:id', (req, res) => new SeasonController(req, res).updateSeason());

module.exports = seasonRouter;