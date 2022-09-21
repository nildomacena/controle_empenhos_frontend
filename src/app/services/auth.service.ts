import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logado: boolean = false;
  logado$ = new BehaviorSubject(true);
  constructor() { }

  isLoggedIn() { }

  login() {
    this.logado$.next(true);
  }

  logout() {
    this.logado$.next(false);
  }
}
