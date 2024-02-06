import { Component, OnInit } from '@angular/core';
import { Cancion } from 'src/app/models/song';
import { SongsService } from 'src/app/services/data/songs.service';
import { PlayerService } from 'src/app/services/func/player.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {

  loadingData = false;

  list: Cancion[] = [];

  constructor(private songService: SongsService, private playerService: PlayerService) { }

  formatDuration(time: number): string{
    const seconds = Math.ceil(time/1000);
    const minutes: number = Math.ceil(seconds/60);
    const displaySeconds = seconds%60;
    // const seconds: number = (time%60);
    return `${minutes}:${(displaySeconds<10)?'0':''}${displaySeconds}`;
  }

  ngOnInit() {
    this.songService.getAllSongs().then((response: Cancion[])=>{
      this.list = response.splice(0,20);
    });
  }

  selectSong(song){
    console.log('song: ', song);
    this.playerService.setCurrentSong(song);
  }

}
