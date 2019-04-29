import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(private auth: AuthService) {
    auth.isAuthenticated().then(result => {
      if(result === true){
        auth.redirectToHome();
      }
    });
  }

  ngOnInit() {
  }

}
