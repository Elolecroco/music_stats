const BaseModel = require('./BaseModel');

class MusicModel extends BaseModel {

    constructor() {
        super('playlists')
    }

    addTrack(newTrack) {
        return this.db.query('INSERT INTO playlists (Season, Year, artist, track, playlist_name, language) VALUES (?, ?, ?, ?, ?, ?)', 
        [newTrack.Season, newTrack.Year,  newTrack.artist, newTrack.track, newTrack.playlist_name, newTrack.language])
    }

    deleteTrack(id) {
        return this.db.query('DELETE FROM playlists WHERE id = ?', [id])
    }

    updateTrack(newTrack, id) {
        return this.db.query('UPDATE playlists SET Season = ?, Year = ?, artist = ?, track = ?, playlist_name = ?, language = ? WHERE id = ?',
        [newTrack.Season, newTrack.Year,  newTrack.artist, newTrack.track, newTrack.playlist_name, newTrack.language, id])
    }
}

module.exports = MusicModel;