import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/data/album.service';
import { PlayerService } from 'src/app/services/func/player.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {

  loadingData = false;

  list: Album[] = [];

  constructor(private albumService: AlbumService, private playerService: PlayerService) { }

  ngOnInit() {
    this.albumService.getAllAlbums().then((response: Album[])=>{
      this.list = response.splice(0,20);
    });
  }

  selectAlbum(album){
    console.log('alb:um ', album);
    this.playerService.setCurrentAlbum(album);
  }

}
