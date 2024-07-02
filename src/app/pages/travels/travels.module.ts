import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelsRoutingModule } from './travels-routing.module';
import { TravelsComponent } from './travels.component';


@NgModule({
  declarations: [
    TravelsComponent
  ],
  imports: [
    CommonModule,
    TravelsRoutingModule
  ]
})
export class TravelsModule { }
