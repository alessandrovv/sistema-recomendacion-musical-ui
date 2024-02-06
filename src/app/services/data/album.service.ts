import { Injectable } from '@angular/core';
import axios from 'axios';
import { mapAlbums } from 'src/app/adapters/album.adapter';
import { Album } from 'src/app/models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  async getAllAlbums(): Promise<Album[]>{
    let albums = [];
    await axios.get('http://localhost:3000/albums').then((response: any)=>{
      albums= mapAlbums(response.data?.data);
    }).catch((error)=>{
      console.error('error on getallAlbums: ', error);
    });
    return albums;
  }
}
