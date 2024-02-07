/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PlayerService } from '../services/func/player.service';
import { Cancion } from '../models/song';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  currentSong: Cancion = null;

  currentQueue: Cancion[] = [];

  playerOpen = false;

  constructor(
    private actionSheetController: ActionSheetController,
    private playerService: PlayerService,
  ) {}


  ngOnInit(){
    this.playerService.currentSong$.subscribe((song: Cancion)=>{
      if(song?.codigo !== this.currentSong?.codigo){
        this.currentSong = song;
      }
      // this.songDisplay=true;
      console.log('setting: ',song);
    });

    this.playerService.playQueue$.subscribe((queue: Cancion[])=>{
      console.log('sub: ', queue);
      this.currentQueue = queue;
      // this.songDisplay = true;
      // this.currentSong = this.currentQueue[0];
    });
  }

  handleSongSelection(song: Cancion){
    if(song.codigo !== this.currentSong.codigo){
      this.playerService.setCurrentSong(song);
    }
  }

}
