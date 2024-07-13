import { Component } from '@angular/core';
import { iTravelComplete } from '../../Models/i-travel-complete';
import { TravelService } from '../../services/travel.service';
import { iCategory } from '../../Models/i-category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  travels: iTravelComplete[] = []
  categories: iCategory[] = []

  constructor(private travelSvc: TravelService, private categorySvc: CategoryService){}

  ngOnInit(){
    this.getAllTravels()

    this.categorySvc.category$.subscribe(categories => this.categories = categories)
  }

  getAllTravels(){
    this.travelSvc.travels$.subscribe(travels => {
      this.travels = this.shuffleArray(travels);
    })
  }

  shuffleArray(array: iTravelComplete[]): iTravelComplete[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
