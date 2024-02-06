import { ListaReproduccion } from '../models/playlist';
import { Cancion } from '../models/song';
import { mapSong, mapSongs } from './song.adapter';

export const mapPlaylist = (playlist: any): ListaReproduccion => ({
    id: playlist.id,
    nombre: playlist.nombre,
    canciones: playlist.CancionListaReproduccion.map(rel=>mapSong(rel.cancion)),
    usuario: playlist.usuario,
  });

export const mapPlaylists = (playlists: any[]): ListaReproduccion[]=>playlists.map(p=>mapPlaylist(p));
