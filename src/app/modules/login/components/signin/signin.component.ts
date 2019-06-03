import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

import { AuthService } from '@app/shared/services/auth/auth.service';
import { DialogAgreementComponent } from '../dialog-agreement/dialog-agreement.component';

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
  public dialogClassWidth: string;
  private hasAcceptedTerm: boolean = false;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService,
  ) {}

  ngOnInit() {
    this.dialogClassWidth = this.deviceService.isMobile ? 'full-width-dialog' : '';
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.loginAttempt();
    }
  }

  openDialogAgreement(){
    const dialogRef = this.dialog.open(DialogAgreementComponent, {
      width: '250px',
      panelClass: this.dialogClassWidth
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      this.hasAcceptedTerm = result;
      this.loginAttempt(false);
    });
  }

  loginAttempt(shouldOpenDialog = true){
    if(this.hasAcceptedTerm){
      this.isSigningIn = true;
      this.auth.signIn(this.login.matricula, this.login.password, this.hasAcceptedTerm);
      this.auth.isSigningIn.subscribe((status => {
        this.isSigningIn = status;
        if(status === true){
          this.login.matricula = '';
          this.login.password = '';
        } else {
          this.login.password = '';
        }
      }))
    } else if(shouldOpenDialog){
      this.openDialogAgreement();
    }
  }

}
