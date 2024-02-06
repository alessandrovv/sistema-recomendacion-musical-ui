import { Album } from './album';
import { Cancion } from './song';

export interface Artista{
  id: number;
  nombre: string;
  urlImagen: string;
  albums?: Album[];
  canciones?: Cancion[];
}
