import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/homepage/homepage.module').then((m) => m.HomepageModule),
      title: 'TOGETHER | To Get There'
  },
  {
    path: 'travels',
    loadChildren: () =>
      import('./pages/travels/travels.module').then((m) => m.TravelsModule),
      title: 'TOGETHER | Travels'
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
    title: 'TOGETHER | Profile'
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/backoffice/create/create.module').then(
        (m) => m.CreateModule
      ),
    canActivate: [AdminGuard],
    title: 'TOGETHER | Add Travel'
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./pages/backoffice/edit/edit.module').then((m) => m.EditModule),
    canActivate: [AdminGuard],
    title: 'TOGETHER | Edit Travel'
  },
  { path: 'about', loadChildren: () =>
      import('./pages/about/about.module').then(m => m.AboutModule),
      title: 'TOGETHER | About'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
