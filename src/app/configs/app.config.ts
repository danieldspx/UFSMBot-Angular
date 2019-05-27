import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  apiURI: 'https://ufsmbot.herokuapp.com',
  routes: {
    login: 'login',
    routine: 'home',
    account: 'account'
  },
  uri: {
   login: '/auth/login',
 },
 snackBarDuration: 3000,
  sideNav: {
    openWidth: '230px', // TODO: Search those values in the SCSS file (Yes, it is possible)
    closedWidth: '70px',
    transition: 200
  }
};
