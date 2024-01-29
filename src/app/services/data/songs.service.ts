import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor() { }

  async getAllSongs(){
    let songs = [];
    await axios.get('http://localhost:3000/songs').then((response: any)=>{
      console.log('songs response: ', response);
       songs=response.data.data;
    }).catch((error)=>{
      console.error('error on getAllSongs: ', error);
    });
    return songs;
  }
}
