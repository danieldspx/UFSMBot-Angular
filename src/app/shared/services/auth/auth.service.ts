import { Injectable, NgZone, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppConfig } from '@app/configs/app.config';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase/app';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: firebase.User = null;
  @Output() public isSigningIn = new EventEmitter();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private db: AngularFirestore
  ) {}

  hasUserTrace(): Promise<boolean>{
    return new Promise((resolve) => {
      this.fireAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.currentUser = user;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async isAuthenticated(): Promise<boolean>{
    if(this.currentUser  === null){
      await this.hasUserTrace();
    }
    return this.currentUser  === null ? false : true;
  }

  signIn(matricula: string, password: string, hasAcceptedTerm: boolean){
    this.fireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const credentials = {matricula: matricula, password: password, hasAcceptedTerm: hasAcceptedTerm};
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    };
    fetch(AppConfig.apiURI+AppConfig.uri.login, requestInit)
    .then((response) => {
      if(response.ok){
        return response.json()
      }
      throw response.status;
    })
    .then((data) => {
      return data.token
    })
    .then((token) => {
      return this.fireAuth.auth.signInWithCustomToken(token)
    })
    .then(() => {
      this.currentUser = this.fireAuth.auth.currentUser;
      this.redirectToHome();
    })
    .catch(error => {
      if(error == 403){
        this.toastr.error('Matricula e/ou Senha incorreto(s).')
      } else if(error == 500){
        this.toastr.error('Os servidores da UFSM estão indisponíveis.')
      } else {
        this.toastr.error('Oops, ocorreu um erro inesperado. Tente novamente mais tarde.')
      }
    })
    .finally(() => {
      this.isSigningIn.emit(false);
    });
  }

  hasToLoginAgain(student){
    return isUndefined(student.agreementAccepted) || student.agreementAccepted === false;
  }

  isFirstLogin(): Promise<boolean>{
    return this.db.firestore.doc(this.getUID())
    .get()
    .then(docSnapshot => {
      const student = docSnapshot.data();
      if(this.hasToLoginAgain(student)){
        this.signOut();
        return false;
      }
      return student.isFirstLogin !== false;
    })
    .catch(() => {
      this.toastr.error('Erro ao buscar dados do estudante')
      return false;
    })
  }

  setFirstLoginFalse(){
    this.db.doc(this.getUID()).update({isFirstLogin: false}).catch(() => {
      this.toastr.error('Erro ao salvar dados do estudante')
    });
  }

  signOut(): void{
    this.currentUser = null;
    this.fireAuth.auth.signOut()
    .then(() => {
      this.toastr.success('Logout realizado com sucesso!');
      this.redirectToLogin();
    })
    .catch(error => this.toastr.error(error.message));
  }

  redirectTo(route: string): void{
    this.ngZone.run(() => this.router.navigateByUrl(route));
  }

  redirectToHome(): void{
    this.redirectTo(AppConfig.routes.routine);
  }

  redirectToLogin(): void{
    this.redirectTo(AppConfig.routes.login);
  }

  deleteCurrentUser(): void{
    this.currentUser.delete();
  }

  getUID(): string{
    return this.currentUser.uid;
  }
}
