import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelsRoutingModule } from './travels-routing.module';
import { TravelsComponent } from './travels.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    TravelsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    TravelsRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class TravelsModule { }
