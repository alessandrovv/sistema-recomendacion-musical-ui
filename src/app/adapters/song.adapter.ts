import { Album } from './../models/album';
import { Cancion } from '../models/song';
import { mapAlbum } from './album.adapter';
import { mapArtist } from './artist.adapter';

export const mapSong = (song: any): Cancion => ({
    id: song.id,
    codigo: song.code,
    nombre: song.titulo,
    urlImagen: song.urlImagen,
    duracion: song.duration,
    url: song.url,
    artistas: (song.ArtistaCancion)?song.ArtistaCancion.map(rel=>mapArtist(rel.artista)):undefined,
    album: (song.Album)? mapAlbum(song.Album): undefined,
});

export const mapSongs = (songs: any[]): Cancion[]=>songs.map(s=>mapSong(s));

export const mapSongSpotify = (apiSongResponse: any): Cancion => ({
    id: 0,
    codigo: apiSongResponse.id,
    nombre: apiSongResponse.name,
    duracion: apiSongResponse.duration_ms,
    url: apiSongResponse.external_urls.spotify,
    album: {
      id: 0,
      codigo: apiSongResponse.album.id,
      nombre: apiSongResponse.album.name,
      artista: undefined,
      canciones: undefined,
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    artistas: apiSongResponse.artists.map(a=>({
      id: 0,
      nombre: a.name,
      urlImagen: undefined,
      albums: undefined,
      canciones: undefined,
    })),
  });
