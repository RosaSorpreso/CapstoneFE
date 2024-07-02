import { Component } from '@angular/core';
import { iTravelComplete } from '../../Models/i-travel-complete';
import { TravelService } from '../../services/travel.service';
import { CategoryService } from '../../services/category.service';
import { iCategory } from '../../Models/i-category';
import { ContinentService } from '../../services/continent.service';
import { iContinent } from '../../Models/i-continent';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent {

  travels: iTravelComplete[] = []
  categories: iCategory[] = []
  continents: iContinent[] = []
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  constructor(
    private travelSvc: TravelService,
    private categorySvc: CategoryService,
    private continentSvc: ContinentService
  ){}

  ngOnInit(){
    this.getAllTravels()

    this.categorySvc.category$.subscribe(categories => {
      this.categories = categories
    })

    this.continentSvc.continent$.subscribe(continents => {
      this.continents = continents
    })
  }

  getAllTravels(){
    this.travels = []
    this.travelSvc.travels$.subscribe(travels => {
      this.travels = travels
    })
  }

  getTravelsBy(type: string, id: number):void{
    this.travels = []
    this.travelSvc.getTravelsBy(type, id).subscribe(travels => {
      this.travels = travels
    })
  }

  getTravelsByBoolean(type: string, boolean: boolean):void{
    this.travels = []
    this.travelSvc.getTravelsByBoolean(type, boolean).subscribe(travels => {
      this.travels = travels
    })
  }

}
