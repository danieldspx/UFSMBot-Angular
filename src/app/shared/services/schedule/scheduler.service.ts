import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth/auth.service';

import { Refeicao } from '../../interfaces/refeicao';
import { Restaurante } from '../../interfaces/restaurante';
import { Dia } from '../../interfaces/dia';
import { Routine } from '../../interfaces/routine';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  public restaurantes: Restaurante[] = [
    {id: 1, nome: "RU - Campus I"},
    {id: 41, nome: "RU - Campus II"}
  ];

  public tiposRefeicoes: Refeicao[] = [
    {id: 1, nome: "Café"},
    {id: 2, nome: "Almoço"},
    {id: 3, nome: "Jantar"},
    {id: 4, nome: "Distribuição"},
    {id: 5, nome: "Distribuição - Kit Desjejum"}
  ];

  public diasSemana: Dia[] = [
    {id: 0, nome: "Domingo"},
    {id: 1, nome: "Segunda"},
    {id: 2, nome: "Terça-feira"},
    {id: 3, nome: "Quarta-feira"},
    {id: 4, nome: "Quinta-feira"},
    {id: 5, nome: "Sexta-feira"},
    {id: 6, nome: "Sábado"},
  ];

  constructor(
    private db: AngularFirestore,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  async addRoutine(routine: Routine): Promise<boolean>{
    return this.db.collection(`estudantes/${this.auth.currentUser}/rotinas`)
    .add(routine)
    .then(() => {
      this.toastr.success("Rotina adicionada com sucesso. Não precisa se preocupar em marcar refeições a partir de hoje 🍽️");
      return true;
    })
    .catch((erro) => {
      this.toastr.error("Erro ao adicionar a rotina.");
      console.log("Error Msg: ", erro);
      return false;
    });
  }

}
