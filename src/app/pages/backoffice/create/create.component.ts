import { Component } from '@angular/core';
import { iTravelComplete } from '../../../Models/i-travel-complete';
import { TravelService } from '../../../services/travel.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  files: File[] = [];
  travelForm: FormGroup;
  whatsIncludedArray: string[] = [];
  itineraryObject: { [key: number]: string } = {};
  travels: iTravelComplete[] = [];

  constructor(
    private travelSvc: TravelService,
    private router: Router,
    private fb: FormBuilder
  ){
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
    this.loadTravel();
  }

  loadTravel() {
    this.travelSvc.getAllTravels().subscribe({
      next: (travels) => {
        this.travels = travels;
      },
      error: (error) => {
        console.error('Error loading travels:', error);
      }
    });
  }

  addTravel() {
    const formValues = this.travelForm.value;
    const { itineraryKey, itineraryValue, ...travelData } = formValues;
    const newTravel = {
      ...travelData,
      whatsIncluded: this.whatsIncludedArray,
      itinerary: this.itineraryObject
    };
    console.log('Dati da inviare:', newTravel);
    this.travelSvc.addTravel(newTravel, this.files).subscribe({
      next: (addedTravel) => {
        this.travels.push(addedTravel);
        this.resetForm();
        this.router.navigate(['/travels']);
      },
      error: (error) => {
        console.error('Error adding travel:', error);
      }
    });
  }

  resetForm() {
    this.travelForm.reset({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      availableSeats: 0,
      price: 0,
      place: '',
      idContinent: 0,
      passportIsRequired: true,
      whatsIncluded: '',
      itineraryKey: '',
      itineraryValue: '',
      idCategories: 0
    });
    this.whatsIncludedArray = [];
    this.itineraryObject = {};
    this.files = [];
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

  onFilesSelected(event: any) {
    if (event.target.files) {
      this.files = Array.from(event.target.files);
    }
  }

  onSubmit() {
    this.addTravel();
  }
}
