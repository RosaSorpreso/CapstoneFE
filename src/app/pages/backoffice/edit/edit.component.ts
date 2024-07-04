import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { iTravelComplete } from '../../../Models/i-travel-complete';
import { TravelService } from '../../../services/travel.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  travelForm: FormGroup;
  whatsIncludedArray: string[] = [];
  itineraryObject: { [key: number]: string } = {};
  travelId: number = 0;

  constructor(
    private travelSvc: TravelService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.travelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      availableSeats: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      place: ['', Validators.required],
      idContinent: [0, Validators.required],
      passportIsRequired: [true],
      whatsIncluded: [''],
      itineraryKey: [''],
      itineraryValue: [''],
      idCategories: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.travelId = this.route.snapshot.params['id'];
    this.loadTravel();
  }

  loadTravel() {
    this.travelSvc.getTravelById(this.travelId).subscribe({
      next: (travel) => {
        this.populateForm(travel);
      },
      error: (error) => {
        console.error('Error loading travel:', error);
      }
    });
  }

  populateForm(travel: iTravelComplete) {
    this.travelForm.patchValue({
      name: travel.name,
      description: travel.description,
      startDate: travel.startDate,
      endDate: travel.endDate,
      availableSeats: travel.availableSeats,
      price: travel.price,
      place: travel.place,
      idContinent: travel.continent.id,
      passportIsRequired: travel.passportIsRequired,
      idCategories: travel.category.id
    });

    this.whatsIncludedArray = travel.whatsIncluded;
    this.itineraryObject = travel.itinerary;
  }

  updateTravel() {
    const formValues = this.travelForm.value;
    const travelData = {
      ...formValues,
      whatsIncluded: this.whatsIncludedArray,
      itinerary: this.itineraryObject
    };

    this.travelSvc.updateTravel(this.travelId, travelData).subscribe({
      next: (updatedTravel) => {
        console.log('Travel updated successfully:', updatedTravel);
        this.router.navigate(['/travels']);
      },
      error: (error) => {
        console.error('Error updating travel:', error);
      }
    });
  }

  addWhatsIncluded() {
    const item = this.travelForm.get('whatsIncluded')?.value;
    if (item) {
      this.whatsIncludedArray.push(item);
      this.travelForm.get('whatsIncluded')?.reset();
    }
  }

  removeWhatsIncluded(index: number) {
    this.whatsIncludedArray.splice(index, 1);
  }

  addItinerary() {
    const key = this.travelForm.get('itineraryKey')?.value;
    const value = this.travelForm.get('itineraryValue')?.value;
    if (key && value) {
      this.itineraryObject[key] = value;
      this.travelForm.get('itineraryKey')?.reset();
      this.travelForm.get('itineraryValue')?.reset();
    }
  }

  removeItinerary(key: number) {
    delete this.itineraryObject[key];
  }

  itineraryKeys(): number[] {
    return Object.keys(this.itineraryObject).map(key => parseInt(key, 10));
  }

  onSubmit() {
    this.updateTravel();
  }
}
