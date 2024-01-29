import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async getAllAlbums(){
    let albums = [];
    await axios.get('http://localhost:5000/albums').then((response: any)=>{
      albums=response.data?.data;
    }).catch((error)=>{
      console.error('error on getallAlbums: ', error);
    });
    return albums;
  }
  async getAllSongs(){
    let songs = [];
    await axios.get('http://localhost:5000/songs').then((response: any)=>{
      console.log('songs response: ', response);
       songs=response.data.data;
    }).catch((error)=>{
      console.error('error on getAllSongs: ', error);
    });
    return songs;
  }
}
