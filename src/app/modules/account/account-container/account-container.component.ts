import { Component, OnInit } from '@angular/core';

import { AccountService } from '@app/shared/services/account/account.service';

@Component({
  selector: 'app-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss']
})
export class AccountContainerComponent implements OnInit {

  public accountInfo: any = {
    curso: 'Curso',
    email: 'estudante@contato.com',
    nome: 'Estudante'
  };

  constructor(
    private account: AccountService
  ) { }

  ngOnInit() {
    this.account.getInfo().then((accountInfo) => {
      this.accountInfo = accountInfo;
    })
  }

  saveEmail(){
    this.account.saveEmail(this.accountInfo.email);
  }

  deleteEverything(){
    this.account.deleteEverything();
  }

}
