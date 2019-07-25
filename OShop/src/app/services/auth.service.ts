import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: any;
  private _currentUser = new BehaviorSubject<object>({});
  currentUser$ = this._currentUser.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      if (new Date(token['.expires']) > new Date()) {
        this._currentUser.next(this.getCurrentUser);
        this.loggedIn.next(true);
      }
    }
    else {
      this.loggedIn.next(false);
      this._currentUser.next(this.getCurrentUser);
    }
  }

  getBaseUrl() {
    return environment.apiUrl;
  }

  login(credentials) {
    let body = "username=" + credentials.username + "&password=" + credentials.password + "&grant_type=password";
    return this.http.post(this.getBaseUrl() + '/api/token', body)
      .pipe(map(response => {
        let result: any = response;
        if (result && result.access_token) {
          localStorage.setItem('token', JSON.stringify(result));
          this.loggedIn.next(true);
          this._currentUser.next(result);
          this.router.navigate(['/']);
          return true;
        }
        return false;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this._currentUser.next(null);
    this.router.navigate(['/']);
    //this.currentUser = null;
  }

  get getCurrentUser() {
    let token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      return null;
    }
    return token;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // isLoggedIn() {
  //   let token = JSON.parse(localStorage.getItem('token'));
  //   if (token) {
  //     if (new Date(token['.expires']) > new Date()) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   return false;
  // }
}


