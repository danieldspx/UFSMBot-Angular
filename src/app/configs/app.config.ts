import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  apiURI: 'http://localhost:3000',
  // apiURI: 'https://cornocomfome.herokuapp.com',
  routes: {
    login: 'app/login',
    routine: 'app/home',
    account: 'app/account'
  },
  uri: {
   login: '/auth/login',
   schedule: '/bot/schedule'
 },
 snackBarDuration: 3000,
  sideNav: {
    openWidth: '230px', // TODO: Search those values in the SCSS file (Yes, it is possible)
    closedWidth: '70px',
    transition: 200
  }
};
