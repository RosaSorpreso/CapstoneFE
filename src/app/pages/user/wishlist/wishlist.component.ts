import { Component } from '@angular/core';
import { iUserComplete } from '../../../Models/i-user-complete';
import { iUserRegistered } from '../../../Models/i-user-registered';
import { AuthService } from '../../../services/auth.service';
import { iTravelLight } from '../../../Models/i-travel-light';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  user: iUserRegistered | undefined;
  userComplete: iUserComplete | undefined;
  userId!: number
  wishlist: iTravelLight[] = []

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
          this.wishlist = this.userComplete.wishlist
        })
      }
    })
  }
}
