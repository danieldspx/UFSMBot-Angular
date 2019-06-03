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
//Lottie Animations
import { LottieAnimationViewModule } from 'ng-lottie';
//Toastr
import { ToastrModule } from 'ngx-toastr';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//Firebase Auth
import { AngularFireAuth } from '@angular/fire/auth';
//Device Detector
 import { DeviceDetectorModule } from 'ngx-device-detector';
//Material Angular
import { MaterialModule } from './core/material.module';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { LoginContainerComponent } from './modules/login/login-container/login-container.component';
import { SigninComponent } from './modules/login/components/signin/signin.component';
import { HomeContainerComponent } from './modules/home/home-container/home-container.component';
import { AccountContainerComponent } from './modules/account/account-container/account-container.component';
//Dialogs
import { DialogWelcomeComponent } from './modules/home/components/dialog-welcome/dialog-welcome.component';
import { DialogSchedulingComponent } from './modules/home/components/dialog-scheduling/dialog-scheduling.component';
import { DialogAgreementComponent } from './modules/login/components/dialog-agreement/dialog-agreement.component';
import { DialogAccountDetailsComponent } from './modules/home/components/dialog-account-details/dialog-account-details.component';
import { AnimationLoadingComponent } from './shared/components/animation-loading/animation-loading.component';
//Services
import { AuthService } from './shared/services/auth/auth.service';
//Others
import { environment } from '@src/environments/environment';
import { WeekdayPipe } from './shared/pipes/weekday.pipe';
import { RestaurantPipe } from './shared/pipes/restaurant.pipe';
import { MealPipe } from './shared/pipes/meal.pipe';
import { AppConfig } from './configs/app.config';

registerLocaleData(ptBr);

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginContainerComponent,
    SigninComponent,
    HomeContainerComponent,
    DialogSchedulingComponent,
    WeekdayPipe,
    RestaurantPipe,
    MealPipe,
    DialogWelcomeComponent,
    AccountContainerComponent,
    DialogAgreementComponent,
    DialogAccountDetailsComponent,
    AnimationLoadingComponent,
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
    PerfectScrollbarModule,
    ToastrModule.forRoot({
      timeOut: AppConfig.snackBarDuration,
      preventDuplicates: true,
    }),
    DeviceDetectorModule.forRoot(),
    LottieAnimationViewModule.forRoot()
  ],
  entryComponents: [
    DialogSchedulingComponent,
    DialogWelcomeComponent,
    DialogAgreementComponent,
    DialogAccountDetailsComponent
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    {provide: LOCALE_ID, useValue: 'pt'},
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
