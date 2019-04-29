import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isUndefined } from 'util';

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
    });
  }
}
