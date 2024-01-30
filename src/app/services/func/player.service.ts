/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private currentSongSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentSong$: Observable<any> = this.currentSongSubject.asObservable();

  private playQueueSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public playQueue$: Observable<any[]> = this.playQueueSubject.asObservable();

  constructor() { }

  setCurrentSong(song: any){
    this.currentSongSubject.next(song);
  }
}
