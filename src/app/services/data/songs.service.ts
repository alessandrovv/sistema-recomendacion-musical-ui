import { Injectable } from '@angular/core';
import axios from 'axios';
import { mapSongs } from 'src/app/adapters/song.adapter';
import { Cancion } from 'src/app/models/song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor() { }

  async getAllSongs(): Promise<Cancion[]>{
    let songs = [];
    await axios.get('http://localhost:3000/songs').then((response: any)=>{
      console.log('songs response: ', response.data.data);
      songs= mapSongs(response.data.data);
    }).catch((error)=>{
      console.error('error on getAllSongs: ', error);
    });
    return songs;
  }
}
