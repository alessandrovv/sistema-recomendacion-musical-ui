import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/services/data/songs.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  topSongs = [];

  constructor(private songService: SongsService) { }

  formatDuration(time: number): string{
    const seconds = Math.ceil(time/1000);
    const minutes: number = Math.ceil(seconds/60);
    const displaySeconds = seconds%60;
    // const seconds: number = (time%60);
    return `${minutes}:${(displaySeconds<10)?'0':''}${displaySeconds}`;
  }

  ngOnInit() {
    this.songService.getAllSongs().then((response: any[])=>{
      this.topSongs = response.splice(0,5);
    });
  }

}
