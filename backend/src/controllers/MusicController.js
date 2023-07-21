const BaseController = require("./BaseController");
const {MusicModel} = require("../models");

class MusicController extends BaseController{

    constructor(req, res) {
        super(req, res);
        this.model = new MusicModel();
    }

    addTrack() {
        this.model
            .addTrack({Season, Year, artist, track, playlist_name, language})
            .then(res => {
                return this.res.status(201).send('New track was added correctly')
            })
            .catch(err => {
                console.error(err);
                return this.res.status(500).send('An error occured while adding the new track')
            })
    }

    updateTrack() {
        const { Season, Year, artist, track, playlist_name, language } = this.req.body;
        const id = this.req.params.id

        this.model.updateTrack({Season, Year, artist, track, playlist_name, language}, id)
            .then(([res]) => {
                if (res.affectedRows === 0) {
                    this.res.status(404).send('Not Found');
                } else {
                    this.res.sendStatus(204);
                }
            })
            .catch(err => {
                console.error(err);
                this.res.status(500).send('An error occured while updating the trakc');
            })
    }

    deleteTrack() {
        const id = this.req.params.id

        this.model.deleteTrack(id)
            .then(([res]) => {
                if (res.affectedRows === 0) {
                    this.res.status(404).send('Not Found')
                } else {
                    this.res.sendStatus(204);
                }
            })
            .catch(err => {
                console.error(err);
                this.res.status(500).send('An error occured while deleting the track')
            })
    }
}

module.exports = MusicController;