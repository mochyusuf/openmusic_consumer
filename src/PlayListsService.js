const { Pool } = require('pg');

class PlayListsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlayList(playlistId) {
    const query = {
      text: 'SELECT playlist.id, playlist.name FROM playlist WHERE playlist.id= $1',
      values: [playlistId],
    };

    const playlists = await this._pool.query(query);

    const query_song = {
      text: 'SELECT song.id, song.title,song.performer FROM playlist INNER JOIN playlistsong ON playlistsong.playlist_id = playlist.id INNER JOIN song ON song.id = playlistsong.song_id WHERE playlist.id = $1',
      values: [playlistId],
    };
    const songs = await this._pool.query(query_song);

    const result = {
      playlist: {
        id: playlists.rows.at(0).id,
        name: playlists.rows.at(0).name,
        songs: songs.rows,
      },
    };
    return result;
  }
}

module.exports = PlayListsService;
