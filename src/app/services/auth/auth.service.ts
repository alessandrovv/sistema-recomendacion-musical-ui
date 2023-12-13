import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router
  ) { }

  // Get user session
  async getSession() {

    // ...
    // put auth session here
    // ...

    // Sample only - remove this after real authentication / session
    const session = {
      email: 'john.doe@mail.com',
    };

    return false;
    // return session;
  }

  // Sign in
  async signIn(email: string, password: string) {
    // Sample only - remove this after real authentication / session
    console.log('sending request');
    const response = await axios.post('http://localhost:3000/auth/login',{email, password});
    console.log('request successfull');
    return response.data;
  }

  // Sign up
  async signUp(email: string, password: string) {
    // Sample only - remove this after real authentication / session

    // const response = await axios.post('localhost:8080/auth/login',{email, password});

    return null;
  }

  // Sign out
  async signOut() {
    // ...
    // clean subscriptions / local storage etc. here
    // ...

    // Navigate to sign-in
    this.router.navigateByUrl('/signin');
  }
}
