import { Component } from '@angular/core';
import { iUserComplete } from '../../Models/i-user-complete';
import { AuthService } from '../../services/auth.service';
import { iUserRegistered } from '../../Models/i-user-registered';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  user: iUserRegistered | undefined;
  userComplete: iUserComplete | undefined;
  userId!: number

  constructor(
    private authSvc: AuthService
  ){}

  ngOnInit(){
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
      if(user){
        this.userId = user.id
        this.authSvc.getUserById(this.userId).subscribe(user => {
          this.userComplete = user
        })
      }
    })
  }

}
