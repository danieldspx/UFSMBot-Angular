import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//Material Angular
import { MaterialModule } from './core/material.module';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { CadastroContainerComponent } from './modules/cadastro/cadastro-container/cadastro-container.component'
//Dialogs
import { DialogCadastroClienteComponent } from './shared/components/dialog-cadastro-cliente/dialog-cadastro-cliente.component';
//Others
import { environment } from '@src/environments/environment';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    CadastroContainerComponent,
    DialogCadastroClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  entryComponents: [
    DialogCadastroClienteComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
