import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  apiURI: 'https://ufsmbot.herokuapp.com/',
  routes: {
    login: 'login',
    home: 'home'
  },
  uri: {
   login: '/auth/login',
 },
};
