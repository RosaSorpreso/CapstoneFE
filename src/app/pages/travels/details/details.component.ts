import { iTravelLight } from './../../../Models/i-travel-light';
import { Component, TemplateRef, inject } from '@angular/core';
import { iTravelComplete } from '../../../Models/i-travel-complete';
import { TravelService } from '../../../services/travel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { iUserRegistered } from '../../../Models/i-user-registered';
import { iUserComplete } from '../../../Models/i-user-complete';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  travel!: iTravelComplete;
  travelId: number = 0;
  user: iUserRegistered | undefined;
  userId!: number;
  userComplete: iUserComplete | undefined;
  private modalService = inject(NgbModal);

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
      if(user){
        this.userId = user.id
        this.authSvc.getUserById(this.userId).subscribe(user => {
          this.userComplete = user
        })
      }
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
    this.travelSvc.addTravelToWishlist(travelId, userId).subscribe()
  }

  isTravelInWishlist(travelId: number): boolean{
    if(this.userComplete && this.userComplete.wishlist?.find((t: iTravelLight) => t.id === travelId)){
      return true
    } else {
      return false
    }
  }

  removeTravelFromWishlist(travelId: number, userId: number) {
    this.travelSvc.removeTravelFromWishlist(travelId, userId).subscribe(() => {
      if(this.userComplete) this.userComplete.wishlist = this.userComplete.wishlist.filter((t: iTravelLight) => t.id !== travelId);
    });
  }

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

}
