import { Artista } from './artist';
import { Cancion } from './song';

export interface Album{
  id: number;
  codigo: string;
  nombre: string;

  rating?: number;

  artista: Artista;
  canciones: Cancion[];
}
