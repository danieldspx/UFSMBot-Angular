import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppConfig } from './configs/app.config';

import { AuthGuard } from './shared/services/auth/auth.guard';

import { LoginContainerComponent } from './modules/login/login-container/login-container.component';
import { HomeContainerComponent } from './modules/home/home-container/home-container.component';
import { AccountContainerComponent } from './modules/account/account-container/account-container.component';

const routes: Routes = [
  { path: AppConfig.routes.login, component: LoginContainerComponent},
  { path: AppConfig.routes.routine, component: HomeContainerComponent, canActivate: [AuthGuard]},
  { path: AppConfig.routes.account, component: AccountContainerComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: `/${AppConfig.routes.routine}`, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
