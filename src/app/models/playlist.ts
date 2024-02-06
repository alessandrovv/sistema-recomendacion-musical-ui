import { Cancion } from './song';

export interface ListaReproduccion{
  id: number;
  nombre: string;

  canciones: Cancion[];

  usuario?: any;
}
