import { Album } from '../models/album';
import { Cancion } from '../models/song';
import { mapArtist } from './artist.adapter';
import { mapSongs } from './song.adapter';

export const mapAlbum = (album: any): Album => ({
    id: album.id,
    codigo: album.code,
    nombre: album.name,

    rating: album.rating,

    artista: (album.artist)?mapArtist(album.artist):undefined,
    canciones:(album.canciones)?mapSongs(album.canciones):undefined,
  });

export const mapAlbums = (albums: any[]): Album[]=>albums.map(a=>mapAlbum(a));
