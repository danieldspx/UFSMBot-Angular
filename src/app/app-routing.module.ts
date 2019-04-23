import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppConfig } from './configs/app.config';

import { CadastroContainerComponent } from './modules/cadastro/cadastro-container/cadastro-container.component';

const routes: Routes = [
  { path: AppConfig.routes.cadastrar, component: CadastroContainerComponent},
  { path: '', redirectTo: '/cadastrar', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
