import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelsComponent } from './travels.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: TravelsComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelsRoutingModule {}
