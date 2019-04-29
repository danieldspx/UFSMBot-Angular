import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public hidePassword: boolean = true;
  public isSigningIn: boolean = false;
  public login: any = {
    matricula: '',
    password: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  loginAttempt(){//TODO: Add Animation
    this.isSigningIn = true;
    this.auth.signIn(this.login.matricula, this.login.password);
    this.auth.isSigningIn.subscribe((status => {
      this.isSigningIn = status;
      if(status === true){
        this.login.matricula = '';
        this.login.password = '';
      } else {
        this.login.password = '';
      }
    }))

  }

}
