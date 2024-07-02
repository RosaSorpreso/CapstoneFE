import { Component } from '@angular/core';
import { iLogin } from '../../Models/i-login';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: iLogin = {
    username: '',
    password: ''
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

    signIn(){

      this.authSvc.login(this.login)
      .subscribe(data => {
        this.router.navigate(['travels'])
      })

    }
}
