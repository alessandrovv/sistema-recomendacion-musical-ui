/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private static instance: SpotifyService|null = null;
  private accessToken: Token|null = null;

  private constructor() { }

  public static getInstance(): SpotifyService{
    if(!SpotifyService.instance){
      SpotifyService.instance = new SpotifyService();
    }

    return SpotifyService.instance;
  }

  public async searchTracks(query: string): Promise<any>{
    console.log('calling makeApiCall', {q:query,type:'track'});
    return this.makeApiCall('search','GET',{q:query,type:'track'});
  }

  private async refreshToken(): Promise<void>{
    const response: AxiosResponse = await axios.post('https://accounts.spotify.com/api/token',{
      grant_type: 'client_credentials',
      client_id: environment.spotifyClientId,
      client_secret: environment.spotifyClientSecret,
    },{
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
      }
    });

    const now = new Date();

    const tokenData = response.data;
    this.accessToken = {
      token: tokenData.access_token,
      type: tokenData.token_type,
      lifetime: tokenData.expires_in,
      expireTime: new Date(now.getTime()+ (+tokenData.expires_in * 1000)),
    };
  }

  private async getAccessToken(): Promise<Token>{
    const now = new Date();
    if(!this.accessToken || now>this.accessToken.expireTime){
      await this.refreshToken();
    }
    return this.accessToken;
  }

  private async makeApiCall(endpoint: string, method: 'GET'|'POST'='GET',data?: any): Promise<any>{
    try {
      console.log('inside : ', data);
      const token = await this.getAccessToken();
      const headers = {Authorization: `${token.type} ${token.token}`};

      const response: AxiosResponse = await axios.request({
        url: `https://api.spotify.com/v1/${endpoint}${(method==='GET'?this.parseQueryParams(data):'')}`,
        method,
        headers,
        data: method === 'POST' ? data : undefined,
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  private parseQueryParams(params: any): string {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return `?${queryString}`|| '';
  }
}


interface Token{
  type: string;
  token: string;
  lifetime: number;
  expireTime: Date;
}
