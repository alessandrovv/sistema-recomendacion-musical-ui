import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Album } from 'src/app/models/album';
import { Cancion } from 'src/app/models/song';
import { AlbumService } from 'src/app/services/data/album.service';
import { DataService } from 'src/app/services/data/data.service';
import { SongsService } from 'src/app/services/data/songs.service';
import { PlayerService } from 'src/app/services/func/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  content_loaded = false;

  recomendations: Array<Album> = [] ;

  lastSongs: Array<Cancion> = [];

  constructor(private songService: SongsService, private albumService: AlbumService, private playerService: PlayerService) { }

  formatDuration(time: number): string{
    const seconds = Math.ceil(time/1000);
    const minutes: number = Math.ceil(seconds/60);
    const displaySeconds = seconds%60;
    // const seconds: number = (time%60);
    return `${minutes}:${(displaySeconds<10)?'0':''}${displaySeconds}`;
  }

  async ngOnInit() {
    setTimeout(()=>{
      this.getSongs().catch(error=>console.error(error));;
    },0);
    setTimeout(()=>{
      this.getAlbums().catch(error=>console.error(error));
    },0);
    // await this.getAlbums();
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  async getAlbums(){
    await this.albumService.getAllAlbums().then((response: any[]) =>{
      this.recomendations = response.splice(0,5);
    }).catch(error=>console.error(error));;
  }

  async getSongs(){
    await this.songService.getAllSongs().then((response: any[])=>{
      this.lastSongs = response.splice(0,5);
      console.log(this.lastSongs);
    }).catch(error=>console.error(error));;
  }

  selectSong(song){
    console.log('song: ', song);
    this.playerService.setCurrentSong(song);
  }

  selectAlbum(album){
    this.playerService.setCurrentAlbum(album);
  }

}
