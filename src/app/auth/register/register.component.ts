import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iUserComplete } from '../../Models/i-user-complete';
import { AuthService } from '../../services/auth.service';
import { iUserRegister } from '../../Models/i-user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData:iUserRegister = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

  signUp(){
    this.authSvc.register(this.registerData)
    .subscribe(data => {

      this.router.navigate(['login'])

    })
  }
}
