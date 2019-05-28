import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { isUndefined } from 'util';

import { AppConfig } from '@app/configs/app.config';
import { AuthService } from '../../services/auth/auth.service';
import { AccountService } from '@app/shared/services/account/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('slideMenuBtnOutside', [
      state("visible", style({ left: AppConfig.sideNav.openWidth, borderRadius: '50%', display: 'block'})),
      state("hidden", style({ transform: 'none', borderRadius: '0px', left: '12px', top: '10px', boxShadow: 'none', display: 'none'})),
      transition("hidden <=> visible", animate(AppConfig.sideNav.transition))
    ]),
    trigger('fadeBtnMenuInside', [
      state("visible", style({height: '*', display: 'block'})),
      state("hidden", style({height: '0px', display: 'none'})),
      transition("hidden => visible", animate(AppConfig.sideNav.transition)),
      transition("visible => hidden", animate(AppConfig.sideNav.transition))
    ]),
    trigger('shrinkSideNav', [
      state("wide", style({ width: AppConfig.sideNav.openWidth })),
      state("narrow", style({ width: AppConfig.sideNav.closedWidth })),
      transition("wide <=> narrow", animate(AppConfig.sideNav.transition))
    ]),
    trigger('slideDrawerContent', [
      state("on", style({ marginLeft: AppConfig.sideNav.openWidth })),
      state("off", style({ marginLeft: AppConfig.sideNav.closedWidth })),
      transition("on <=> off", animate(AppConfig.sideNav.transition))
    ]),
  ]
})

export class NavigationComponent implements OnInit {
  //You can find the icons here: https://dev.materialdesignicons.com
  modulesList: any[] = [
    {
      name: 'Rotina',
      icon: 'food-fork-drink',
      route: AppConfig.routes.routine
    },
    {
      name: 'Conta',
      icon: 'account-circle',
      route: AppConfig.routes.account
    },
  ];
  sideNavOpen: boolean = true;
  opacityTextListSidenav: number = 1;

  btnMenuInsideListState: string = 'hidden'; //Hidden if sideNavOpen is true
  opacityBtnMenuInsideList: number = 0;

  btnMenuOutsideListState: string = 'visible'; //Hidden if sideNavOpen is true

  isMobile: boolean;

  firstName: string = 'Estudante'

  constructor(
    private auth: AuthService,
    private media: MediaMatcher,
    private account: AccountService
  ){
    this.isMobile = media.matchMedia('(max-width: 800px)').matches;
    if(this.isMobile){
      this.sideNavOpen = false;
    }
  }

  ngOnInit() {
    this.account.getInfo().then((accountInfo) => {
      if(!isUndefined(accountInfo.nome)){
        this.firstName = accountInfo.nome.split(' ')[0];
      }
    })
  }

  toggleSideNav(){
    this.sideNavOpen = !this.sideNavOpen;
    this.toggleBtnMenuOutsideState();
  }

  navigateOnMenu(){
    if(this.isMobile){
      this.toggleSideNav();
    }
  }

  toggleBtnMenuOutsideState(){
    this.btnMenuOutsideListState = this.btnMenuOutsideListState == 'visible' ? 'hidden' : 'visible';
  }

  toggleStateBtnMenuInside(stage: string){
    const outBtnFutureState = this.btnMenuOutsideListState;//Just for readability
    this.btnMenuInsideListState = outBtnFutureState == 'visible' ? 'hidden' : 'visible';
  }

  toggleOpacityBtnMenuInside(event: any){
    if(event.fromState != 'void'){
      if(event.phaseName == 'done' && event.fromState == 'hidden'){
        this.opacityBtnMenuInsideList = 1;
        this.toggleOpacityTextListSidenav();
      } else if(event.phaseName == 'start' && event.fromState == 'visible'){
        this.opacityBtnMenuInsideList = 0;
        this.toggleOpacityTextListSidenav();
      }
    }
  }

  toggleOpacityTextListSidenav(){
    this.opacityTextListSidenav = this.opacityTextListSidenav == 1 ? 0 : 1;
  }

  getSlideDrawerAnimation(){
    if(this.sideNavOpen && !this.isMobile){
      return 'on';
    } else if (!this.isMobile){
      return 'off'
    }
    return '';
  }

  signOut(){
    this.auth.signOut();
  }
}
