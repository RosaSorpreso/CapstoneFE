import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelsRoutingModule } from './travels-routing.module';
import { TravelsComponent } from './travels.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    TravelsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    TravelsRoutingModule,
    NgbDropdownModule
  ]
})
export class TravelsModule { }
