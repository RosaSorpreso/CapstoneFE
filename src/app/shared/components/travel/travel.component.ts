import { Component, Input, TemplateRef, inject } from '@angular/core';
import { iTravelComplete } from '../../../Models/i-travel-complete';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iTravelLight } from '../../../Models/i-travel-light';
import { iUserComplete } from '../../../Models/i-user-complete';
import { iUserRegistered } from '../../../Models/i-user-registered';
import { AuthService } from '../../../services/auth.service';
import { TravelService } from '../../../services/travel.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss'
})
export class TravelComponent {
  @Input() travel!: iTravelComplete | iTravelLight
  private modalService = inject(NgbModal);

  user: iUserRegistered | undefined;
  userComplete: iUserComplete | undefined;
  userId!: number;

  constructor(
    private travelSvc: TravelService,
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

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  addTravelToWishlist(travelId: number, userId: number){
    this.travelSvc.addTravelToWishlist(travelId, userId).subscribe(() => {
      if (this.travel.id == travelId) this.userComplete!.wishlist.push(this.travel);
    })
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
      this.userComplete!.wishlist = this.userComplete!.wishlist.filter(t => t.id !== travelId);
    });
  }

  deleteTravel(id: number){
    this.travelSvc.deleteTravel(id).subscribe()
  }
}
