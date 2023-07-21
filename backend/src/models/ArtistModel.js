const BaseModel = require('./BaseModel');

class ArtistModel extends BaseModel {

    constructor() {
        super('playlists')
    }

    getAllArtistSongs(artistName) {
        return this.db.query(`SELECT * FROM ${this.table} WHERE artist = ?`, [artistName]);
    }

}

module.exports = ArtistModel;