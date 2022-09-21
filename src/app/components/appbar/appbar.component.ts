import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  isLoggedIn = false;
  constructor(private readonly authService: AuthService) {
    this.authService.logado$.subscribe((value) => {
      console.log(value);
      this.isLoggedIn = value;
    })
  }

  ngOnInit(): void {
  }

  onLogin() {
    console.log(this.isLoggedIn)
    this.isLoggedIn ? this.logout() : this.login();
  }
  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
