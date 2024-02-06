import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PlayerService } from '../services/func/player.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  playerOpen = false;
  // songDisplay = false;

  currentSong: any = null;

  currentQueue: any[] = [];


  constructor(
    private actionSheetController: ActionSheetController,
    private playerService: PlayerService,
  ) {}

  ngOnInit(){
    this.playerService.currentSong$.subscribe((song)=>{
      if(song?.code !== this.currentSong?.code){
        this.currentSong = song;
      }
      // this.songDisplay=true;
      console.log('setting: ',song);
    });

    this.playerService.playQueue$.subscribe((queue)=>{
      console.log('sub: ', queue);
      this.currentQueue = queue;
      // this.songDisplay = true;
      // this.currentSong = this.currentQueue[0];
    });
  }

  handleSongSelection(song){
    if(song.code !== this.currentSong.code){
      this.playerService.setCurrentSong(song);
    }
  }

}
