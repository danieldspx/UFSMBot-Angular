import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppConfig } from './configs/app.config';

import { AuthGuard } from './shared/services/auth/auth.guard';

import { LoginContainerComponent } from './modules/login/login-container/login-container.component';
import { HomeContainerComponent } from './modules/home/home-container/home-container.component';

const routes: Routes = [
  { path: AppConfig.routes.login, component: LoginContainerComponent},
  { path: AppConfig.routes.home, component: HomeContainerComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
