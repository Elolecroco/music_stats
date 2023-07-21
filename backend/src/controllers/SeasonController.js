const BaseController = require("./BaseController");
const {SeasonModel} = require("../models");

class SeasonController extends BaseController{

    constructor(req, res) {
        super(req, res);
        this.model = new SeasonModel();
    }

    addSeason() {
        const { season, year, name } = this.req.body;

        this.model.addSeason({ season, year, name })
            .then(res => {
                return this.res.status(201).send({season, year, name})
            })
            .catch(err => {
                console.error(err);
                return this.res.status(500).send('An error occured while adding the season')
            })
    }

    updateSeason() {
        const { season, year, name } = this.req.body;
        const id = this.req.params.id

        this.model.updateSeason({ season, year, name }, id)
            .then(([res]) => {
                if (res.affectedRows === 0) {
                    this.res.status(404).send('Not Found')
                } else {
                    this.res.sendStatus(204)}
            })
            .catch(err => {
                console.error(err);
                return this.res.status(500).send('An error occured while updating the season')
            })
    }

    deleteSeason() {
        const id = this.req.params.id

        this.model.deleteSeason(id)
            .then(([res]) => {
                if (res.affectedRows === 0) {
                    this.res.status(404).send('Not Found')
                } else {
                    this.res.sendStatus(204)}
            })
            .catch(err => {
                console.error(err);
                return this.res.status(500).send('An error occured while deleting the season')
            })
    }

}

module.exports = SeasonController;