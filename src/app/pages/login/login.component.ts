import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  esqueceuSenha = false;
  fazerCadastro = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login();
    this.router.navigateByUrl('')
  }

  toggleFazerCadastro() {
    this.fazerCadastro = true;
    this.esqueceuSenha = false;
  }

  toggleEsqueciSenha() {
    this.fazerCadastro = false;
    this.esqueceuSenha = true;
  }

  toggleLogin() {
    this.esqueceuSenha = this.fazerCadastro = false;
  }

}
