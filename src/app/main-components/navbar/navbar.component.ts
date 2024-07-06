import { Component } from '@angular/core';
import { iUserRegistered } from '../../Models/i-user-registered';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user: iUserRegistered | undefined;

  constructor(private authSvc:AuthService) {
  }

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })
  }

  logout(){
    this.authSvc.logout();
  }

}
