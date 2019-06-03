import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/shared/services/account/account.service';

@Component({
  selector: 'app-dialog-account-details',
  templateUrl: './dialog-account-details.component.html',
  styleUrls: ['./dialog-account-details.component.scss']
})
export class DialogAccountDetailsComponent implements OnInit {

  public email: string;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  saveEmail(){
    this.accountService.saveEmail(this.email);
  }

}
