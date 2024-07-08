import { Component } from '@angular/core';
import { iTravelComplete } from '../../Models/i-travel-complete';
import { TravelService } from '../../services/travel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { iUserRegistered } from '../../Models/i-user-registered';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  travel: iTravelComplete | undefined;
  travelId: number = 0;
  user: iUserRegistered | undefined;
  userId!: number;

  constructor(
    private travelSvc: TravelService,
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(){
    this.travelId = this.route.snapshot.params['id'];
    this.loadTravel();

    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
      if(user) this.userId = user.id
    })

  }

  loadTravel() {
    this.travelSvc.getTravelById(this.travelId).subscribe({
      next: (travel) => {
        this.travel = travel;
      },
      error: (error) => {
        console.error('Error loading travel:', error);
      }
    });
  }

  purchaseTravel(travelId: number, userId: number){
    this.travelSvc.purchaseTravel(travelId, userId).subscribe(data =>
      this.router.navigate(['travels']))
  }

  addTravelToWishlist(travelId: number, userId: number){
    this.travelSvc.addTravelToWishlist(travelId, userId).subscribe(data =>
      this.router.navigate(['travels']))
  }

}
