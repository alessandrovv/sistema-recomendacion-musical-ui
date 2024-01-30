import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getPlaylists(){
    let playlists = [];
    await axios.get('http://localhost:3000/playlists/my').then((response: any)=>{
      console.log('playlists response: ', response);
      playlists = response.data.data;
    }).catch((error)=>{
      console.error('error on getAllSongs: ', error);
    });
    return playlists;
  }
}
