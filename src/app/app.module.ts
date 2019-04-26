import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
//FxLayout
import { FlexLayoutModule } from '@angular/flex-layout';
//PerfectScrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//Material Angular
import { MaterialModule } from './core/material.module';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { HomeContainerComponent } from './modules/home/home-container/home-container.component';
//Dialogs
import { DialogSchedulingComponent } from './modules/home/components/dialog-scheduling/dialog-scheduling.component';
//Others
import { environment } from '@src/environments/environment';

registerLocaleData(ptBr);

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

};

@NgModule({
  declarations: [
    AppComponent,
    HomeContainerComponent,
    DialogSchedulingComponent,
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
    FlexLayoutModule,
    PerfectScrollbarModule
  ],
  entryComponents: [
    DialogSchedulingComponent
  ],
  providers: [
    // {provide: LOCALE_ID, useValue: 'pt'},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
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
