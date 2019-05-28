import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isUndefined } from 'util';

// ga is the Analitycs function
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UFSMBot';

  isLoginRoute: boolean = false;
  currentRoute: string = '';
  regexLogin = new RegExp('\\w*/login\\b');

  constructor(private router: Router){
    router.events.subscribe((url:any) => {
      if(!isUndefined(url.urlAfterRedirects) && url.urlAfterRedirects !== this.currentRoute){
        this.currentRoute = url.urlAfterRedirects;
        this.isLoginRoute = this.regexLogin.test(this.currentRoute);
      }

      if (url instanceof NavigationEnd) {
        ga('set', 'page', url.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
}
