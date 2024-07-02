import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelsRoutingModule } from './travels-routing.module';
import { TravelsComponent } from './travels.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TravelsComponent
  ],
  imports: [
    CommonModule,
    TravelsRoutingModule,
    NgbDropdownModule
  ]
})
export class TravelsModule { }
