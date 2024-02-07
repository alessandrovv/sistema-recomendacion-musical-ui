/* eslint-disable @typescript-eslint/naming-convention */
import { Cancion } from './../../models/song';
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private currentSongSubject: BehaviorSubject<Cancion> = new BehaviorSubject<Cancion>(null);
  public currentSong$: Observable<Cancion> = this.currentSongSubject.asObservable();

  private playQueueSubject: BehaviorSubject<Cancion[]> = new BehaviorSubject<Cancion[]>([]);
  public playQueue$: Observable<Cancion[]> = this.playQueueSubject.asObservable();

  constructor() { }

  setCurrentSong(song: Cancion){
    this.currentSongSubject.next(song);
  }

  setCurrentAlbum(album: Album){
    console.log('servicios: ', album, album.canciones[0]);
    console.log('primera: ', album.canciones[0]);
    album.canciones.forEach(c=>c.album = album);
    this.playQueueSubject.next(album.canciones);
    this.currentSongSubject.next(album.canciones[0]);
  }
}
