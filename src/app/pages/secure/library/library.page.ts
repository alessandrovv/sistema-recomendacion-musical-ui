import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  contentLoaded = true;
  playlists = [];
  favorite = null;

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.userService.getPlaylists().then((response: any[])=>{
      this.playlists = response;
      this.favorite = this.playlists.splice(0,1)[0];
    });
  }

}
