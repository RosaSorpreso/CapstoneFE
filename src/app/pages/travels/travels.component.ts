import { Component, TemplateRef, inject } from '@angular/core';
import { iTravelComplete } from '../../Models/i-travel-complete';
import { TravelService } from '../../services/travel.service';
import { CategoryService } from '../../services/category.service';
import { iCategory } from '../../Models/i-category';
import { ContinentService } from '../../services/continent.service';
import { iContinent } from '../../Models/i-continent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent {

  private modalService = inject(NgbModal);

  travels: iTravelComplete[] = []
  categories: iCategory[] = []
  continents: iContinent[] = []
  months = [
    {
      name: "january",
      month: 1
    },
    {
      name: "february",
      month: 2
    },
    {
      name: "march",
      month: 3
    },
    {
      name: "april",
      month: 4
    },
    {
      name: "may",
      month: 5
    },
    {
      name: "june",
      month: 6
    },
    {
      name: "july",
      month: 7
    },
    {
      name: "august",
      month: 8
    },
    {
      name: "september",
      month: 9
    },
    {
      name: "october",
      month: 10
    },
    {
      name: "november",
      month: 11
    },
    {
      name: "december",
      month: 12
    }
  ]

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

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
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

  deleteTravel(id: number){
    this.travelSvc.deleteTravel(id).subscribe()
  }

}
