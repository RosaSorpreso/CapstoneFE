import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TravelComponent } from './components/travel/travel.component';


@NgModule({
  declarations: [
    TravelComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    TravelComponent
  ]
})
export class SharedModule { }
