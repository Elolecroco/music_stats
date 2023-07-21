const BaseModel = require('./BaseModel');

class SeasonModel extends BaseModel {

    constructor() {
        super('seasons')
    }

    addSeason(newPlaylist) {
        return this.db.query('INSERT INTO seasons (season, year, name) VALUES (?, ?, ?)', 
        [newPlaylist.season, newPlaylist.year, newPlaylist.name])
    }

    deleteSeason(id) {
        return this.db.query('DELETE FROM seasons WHERE id = ?', [id])
    }

    updateSeason(newPlaylist, id) {
        return this.db.query('UPDATE seasons SET season = ?, year = ?, name = ? WHERE id= ?',
        [newPlaylist.season, newPlaylist.year, newPlaylist.name, id])
    }
}

module.exports = SeasonModel;