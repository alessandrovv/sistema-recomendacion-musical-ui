import { Injectable } from '@angular/core';
import axios from 'axios';
import { mapArtists } from 'src/app/adapters/artist.adapter';
import { Artista } from 'src/app/models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor() { }

  async getAllArtists(): Promise<Artista[]>{
    let artists = [];
    await axios.get('http://localhost:3000/artists').then((response: any)=>{
      artists= mapArtists(response.data?.data);
    }).catch((error)=>{
      console.error('error on getallAlbums: ', error);
    });
    return artists;
  }
}
