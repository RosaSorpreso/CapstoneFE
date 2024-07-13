import { Component } from '@angular/core';
import { iTravelComplete } from '../../Models/i-travel-complete';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  travels: iTravelComplete[] = []

  constructor(private travelSvc: TravelService){}

  ngOnInit(){
    this.getAllTravels()
  }

  getAllTravels(){
    this.travels = []
    this.travelSvc.travels$.subscribe(travels => {
      this.travels = this.shuffleArray(travels);
    })
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
