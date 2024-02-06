import { Album } from './album';
import { Artista } from './artist';

export interface Cancion{
  id: number;
  codigo: string;

  nombre: string;
  urlImagen?: string;
  duracion: number;
  url?: string;

  artistas: Artista[];
  album?: Album;
}
