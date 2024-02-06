import { PlayerService } from './../../../../services/func/player.service';
import { Component, OnInit } from '@angular/core';
import { Artista } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/data/artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
})
export class ArtistsPage implements OnInit {

  loadingData = false;

  list: Artista[] = [];

  constructor(private artistService: ArtistService, private playerService: PlayerService) { }

  ngOnInit() {
    this.artistService.getAllArtists().then((response: Artista[])=>{
      this.list = response.splice(0,20);
    });
  }

  selectArtist(artist){
    console.log('artsist ', artist);
    // this.playerService.setCurrentAlbum(album);
  }

}
