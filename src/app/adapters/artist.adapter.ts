import { Artista } from '../models/artist';
import { Cancion } from '../models/song';
import { mapAlbums } from './album.adapter';
import { mapSong } from './song.adapter';

export const mapArtist = (artist: any): Artista => ({
    id: artist.id,
    nombre: artist.nombre,
    urlImagen: undefined,
    albums: (artist.albums)?mapAlbums(artist.albums):undefined,
    canciones: (artist.ArtistaCancion)?artist.ArtistaCancion.map(rel=>mapSong(rel.cancion)):undefined,
  });

export const mapArtists = (artists: any[]): Artista[]=>artists.map(a=>mapArtist(a));
