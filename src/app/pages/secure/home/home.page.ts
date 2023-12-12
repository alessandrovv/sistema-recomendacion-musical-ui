import { Component, OnInit } from '@angular/core';

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

  constructor() { }


  ngOnInit() {

    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

}
