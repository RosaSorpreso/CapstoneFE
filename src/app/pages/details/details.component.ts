import { Component } from '@angular/core';
import { iTravelComplete } from '../../Models/i-travel-complete';
import { TravelService } from '../../services/travel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  travel: iTravelComplete | undefined;
  travelId: number = 0;

  constructor(
    private travelSvc: TravelService,
    private route: ActivatedRoute){}

  ngOnInit(){
    this.travelId = this.route.snapshot.params['id'];
    this.loadTravel();
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

}
