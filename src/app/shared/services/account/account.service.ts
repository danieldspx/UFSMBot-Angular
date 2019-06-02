import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { isUndefined } from 'util';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private accountInfo: Account = {};

  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private toastr: ToastrService
  ) { }

  async fetchAllInfo(){
    await this.auth.hasUserTrace();//Make sure we have the user
    await this.db.firestore.doc(this.auth.getUID())
    .get()
    .then((docSnapshot) => {
      const nome = docSnapshot.data().nome;
      const email = docSnapshot.data().email;
      const curso = docSnapshot.data().curso;
      this.accountInfo.curso = isUndefined(curso) ? 'Curso' : curso;
      this.accountInfo.email = isUndefined(email) ? 'estudante@contato.com' : email;
      this.accountInfo.nome = isUndefined(nome) ? 'Estudante' : nome;
    })
    .catch((error) => {
      this.toastr.error('Erro ao buscar seus dados. Tente novamente mais tarde.')
    })
  }

  async getInfo(): Promise<Account>{
    if(isUndefined(this.accountInfo.nome)){
      await this.fetchAllInfo();
    }
    return this.accountInfo;
  }

  deleteEverything(){
    this.db.firestore.collection(`${this.auth.getUID()}/rotinas`)
    .get()
    .then((querySnapshot) => {
      this.toastr.info('Deletando rotinas...');
      querySnapshot.forEach((docSnapshot) => {
        docSnapshot.ref.delete();
      })
    })
    .then(() => {
      this.toastr.info('Deletando dados pessoais...');
      return this.db.firestore.doc(this.auth.getUID()).delete()
    })
    .then(() => {
      this.toastr.info('Deletando conta e saindo...');
      this.auth.deleteCurrentUser();
    })
    .catch((error) => {
      this.toastr.error('Algo deu errado, tente novamente mais tarde.');
    })
    .finally(() => {
      this.auth.signOut();
    });
  }

  saveEmail(email: string){
    this.db.firestore.doc(this.auth.getUID())
    .update({email: email})
    .then(() => {
      this.toastr.success('Atualizado com sucesso.')
    })
    .catch((error) => {
      this.toastr.error('Erro ao atualizar. Verifique sua conexão.');
    })
  }

}

export interface Account{
  nome?: string,
  curso?: string,
  email?: string
}
