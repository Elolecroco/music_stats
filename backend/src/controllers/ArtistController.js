const BaseController = require("./BaseController");
const {ArtistModel} = require("../models");

class ArtistController extends BaseController{

    constructor(req, res) {
        super(req, res);
        this.model = new ArtistModel();
    }

    getAllArtistSongs() {
        const artistName = this.req.params.artistName;
        
        this.model.getAllArtistSongs(artistName)

            .then(results => {
                return this.res.status(201).json(results);
            })
            .catch(err => {
                console.error(err);
                return this.res.status(500).send('Could Not Find the Artist')
            })
    }
}

module.exports = ArtistController;