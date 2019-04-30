import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-dialog-welcome',
  templateUrl: './dialog-welcome.component.html',
  styleUrls: ['./dialog-welcome.component.scss']
})
export class DialogWelcomeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogWelcomeComponent>,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.setFirstLoginFalse();
  }

}
