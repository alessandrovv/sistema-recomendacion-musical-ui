import { mapSongSpotify } from './../../../adapters/song.adapter';
import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/services/data/songs.service';
import { PlayerService } from 'src/app/services/func/player.service';
import * as _ from 'lodash';
import { SpotifyService } from 'src/app/services/func/spotify.service';
import { Cancion } from 'src/app/models/song';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  topSongs: Array<Cancion> = [];

  searching = false;
  searchResults: Array<Cancion> = [];

  private throttleSearch: (s: string) => void;

  private spotifyService: SpotifyService;

  constructor(private songService: SongsService, private playerService: PlayerService) {
    this.throttleSearch = _.debounce(this.search,500, { trailing: true });
    this.spotifyService = SpotifyService.getInstance();
  }

  formatDuration(time: number): string{
    const seconds = Math.ceil(time/1000);
    const minutes: number = Math.ceil(seconds/60);
    const displaySeconds = seconds%60;
    // const seconds: number = (time%60);
    return `${minutes}:${(displaySeconds<10)?'0':''}${displaySeconds}`;
  }

  ngOnInit() {
    this.songService.getAllSongs().then((response: Cancion[])=>{
      this.topSongs = response.splice(0,5);
    });
  }

  onSearchInputChange(event: any): void{
    const searchText = (event.target as HTMLInputElement).value;
    this.searching = searchText!=='';
    this.throttleSearch(searchText);
  }

  selectSong(song){
    console.log('song: ', song);
    this.playerService.setCurrentSong(song);
  }

  mapSong(apiSongResponse){
    return {
      titulo: apiSongResponse.name,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ArtistaCancion: apiSongResponse.artists.map(a=>({artista: {
        nombre: a.name
      }})),
      duration: apiSongResponse.duration_ms,
    };
  }

  private search(searchText: string): void{
    console.log('search :', searchText);
    if(searchText){
      this.spotifyService.searchTracks(searchText).then(
        (response)=>{
          this.searchResults = response.tracks.items.map(i=>mapSongSpotify(i));
        }
      ).catch(
        (error)=>{
          console.error('search error: ', error);
        }
      );
    }
  }
}
