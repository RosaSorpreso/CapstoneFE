import { Component } from '@angular/core';
import { iTravelComplete } from '../../Models/i-travel-complete';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent {

  travels: iTravelComplete[] = []

  constructor(
    private travelSvc: TravelService
  ){}

  ngOnInit(){

    this.travelSvc.travels$.subscribe(travel => {
      this.travels = travel
    })

  }

}
