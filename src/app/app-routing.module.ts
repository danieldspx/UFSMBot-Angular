import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppConfig } from './configs/app.config';

import { HomeContainerComponent } from './modules/home/home-container/home-container.component';

const routes: Routes = [
  { path: AppConfig.routes.home, component: HomeContainerComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
