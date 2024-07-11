import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: 'travels',
    loadChildren: () =>
      import('./pages/travels/travels.module').then((m) => m.TravelsModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/backoffice/create/create.module').then(
        (m) => m.CreateModule
      ),
    canActivate: [AdminGuard],
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./pages/backoffice/edit/edit.module').then((m) => m.EditModule),
    canActivate: [AdminGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
