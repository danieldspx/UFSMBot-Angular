import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-agreement',
  templateUrl: './dialog-agreement.component.html',
  styleUrls: ['./dialog-agreement.component.scss']
})
export class DialogAgreementComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAgreementComponent>
  ) { }

  ngOnInit() {
  }

  acceptAgreement(){
    this.dialogRef.close(true)
  }

  declineAgreement(){
    this.dialogRef.close(false)
  }

}
