import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  async getAllAlbums(){
    let albums = [];
    await axios.get('http://localhost:3000/albums').then((response: any)=>{
      albums=response.data?.data;
    }).catch((error)=>{
      console.error('error on getallAlbums: ', error);
    });
    return albums;
  }
}
