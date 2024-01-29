import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/data/album.service';
import { DataService } from 'src/app/services/data/data.service';
import { SongsService } from 'src/app/services/data/songs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  content_loaded = false;

  recomendations: Array<any> = [{
    id: 1,
    song: 'Test 1',
    artist: 'fulano'
  },{
    id: 2,
    song: 'Test 2',
    artist: 'fulano'
  },{
    id: 3,
    song: 'Test 3',
    artist: 'fulano'
  }] ;

  lastSongs: Array<any> = [{
    id: 3,
    song: 'Test 4',
    artist: 'fulano',
  },{
    id: 2,
    song: 'Test 2',
    artist: 'fulano',
  },{
    id: 5,
    song: 'Test 5',
    artist: 'fulano',
  }];

  constructor(private songService: SongsService, private albumService: AlbumService) { }

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

}
