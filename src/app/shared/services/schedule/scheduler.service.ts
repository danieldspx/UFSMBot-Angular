import { Injectable } from '@angular/core';

import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth/auth.service';

import { Refeicao } from '../../interfaces/refeicao';
import { Restaurante } from '../../interfaces/restaurante';
import { Dia } from '../../interfaces/dia';
import { Routine } from '../../interfaces/routine';
import { RoutineWrapper } from '@app/shared/interfaces/routine-wrapper';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  private restaurantes: Restaurante[] = [
    {id: 1, nome: 'RU - Campus I'},
    {id: 41, nome: 'RU - Campus II'}
  ];

  private tiposRefeicoes: Refeicao[] = [
    {id: 1, nome: 'Café'},
    {id: 2, nome: 'Almoço'},
    {id: 3, nome: 'Jantar'},
    {id: 4, nome: 'Distribuição'},
    {id: 5, nome: 'Kit Desjejum'}
  ];

  private diasSemana: Dia[] = [
    {id: 0, nome: 'Domingo', short: 'Dom'},
    {id: 1, nome: 'Segunda', short: 'Seg'},
    {id: 2, nome: 'Terça-feira', short: 'Ter'},
    {id: 3, nome: 'Quarta-feira', short: 'Qua'},
    {id: 4, nome: 'Quinta-feira', short: 'Qui'},
    {id: 5, nome: 'Sexta-feira', short: 'Sex'},
    {id: 6, nome: 'Sábado', short: 'Sáb'},
  ];

  private currentRoutines: RoutineWrapper[] = [];

  constructor(
    private db: AngularFirestore,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  async addRoutine(routine: Routine): Promise<boolean>{
    return this.db.collection(`estudantes/${this.auth.getUID()}/rotinas`)
    .add(routine)
    .then((ref) => {
      this.currentRoutines.push(<RoutineWrapper>{id: ref.id, docRef: ref, data: routine});
      this.toastr.success('Rotina adicionada com sucesso. Não precisa se preocupar em marcar refeições a partir de hoje 🍽️');
      return true;
    })
    .catch((erro) => {
      this.toastr.error('Erro ao adicionar a rotina.');
      console.log('Error Msg: ', erro);
      return false;
    });
  }

  async getAllRoutines(): Promise<RoutineWrapper[] | boolean>{
    return this.db.firestore.collection(`estudantes/${this.auth.getUID()}/rotinas`)
    .get()
    .then((snapshot: QuerySnapshot<Routine>) => {
      this.currentRoutines = [];
      snapshot.forEach((doc: QueryDocumentSnapshot<Routine>) => {
        this.currentRoutines.push({
          id: doc.id,
          docRef: doc.ref,
          data: doc.data()
        });
      });
      return this.currentRoutines;
    })
    .catch((e) => {
      console.log(e);
      this.toastr.error('Erro ao conectar com o servidor.');
      return false;
    })
  }

  async updateRoutine(routine: RoutineWrapper): Promise<boolean>{
    return this.db.doc(routine.docRef.path).set(routine.data)
    .then(() => {
      this.toastr.success('Rotina atualizada com sucesso.');
      return true;
    })
    .catch(() => {
      this.toastr.error('Erro ao atualizar rotina.');
      return false;
    });
  }

  async deleteRoutine(routineDelete: RoutineWrapper): Promise<boolean>{
    return this.db.doc(routineDelete.docRef.path).delete()
    .then(() => {
      this.currentRoutines = this.currentRoutines.filter(routine => routine.id != routineDelete.id);
      this.toastr.success('Rotina deletada com sucesso.');
      return true;
    })
    .catch(() => {
      this.toastr.error('Erro ao deletar rotina.');
      return false;
    })
  }

  hasRoutines(): boolean{
    return this.currentRoutines.length !== 0;
  }

  getDiasSemana(): Dia[]{
    return [...this.diasSemana];
  }

  getRestaurantes(): Restaurante[]{
    return [...this.restaurantes];
  }

  getTiposRefeicoes(): Refeicao[]{
    return [...this.tiposRefeicoes];
  }

}
