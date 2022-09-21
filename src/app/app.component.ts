import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isLoggedIn = false;
  constructor(private readonly authService: AuthService, private router: Router) {
    this.authService.logado$.subscribe((value) => {
      this.isLoggedIn = value;
      if (!this.isLoggedIn) {
        this.router.navigateByUrl('/login');
      }
      console.log('appComponent', this.isLoggedIn);
    })
  }
}
