import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'travels', loadChildren: () => import('./pages/travels/travels.module').then(m => m.TravelsModule) },
  { path: 'homepage', loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'create', loadChildren: () => import('./pages/backoffice/create/create.module').then(m => m.CreateModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
