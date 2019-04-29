import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hidePassword: boolean = true;
  login: any = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  loginAttempt(){//TODO: Add Animation
    this.auth.signIn(this.login.email, this.login.password);
    this.login.email = '';//TODO: only if signIn was successful
    this.login.password = '';
  }

}
