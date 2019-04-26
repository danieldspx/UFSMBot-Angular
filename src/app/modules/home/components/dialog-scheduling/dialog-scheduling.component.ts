import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ToastrService } from 'ngx-toastr';

import { Routine } from '@app/shared/interfaces/routine';
import { Refeicao } from '@app/shared/interfaces/refeicao';
import { Restaurante } from '@app/shared/interfaces/restaurante';
import { Dia } from '@app/shared/interfaces/dia';

import { SchedulerService } from '@app/shared/services/schedule/scheduler.service';
import { isUndefined } from 'util';
import { RoutineWrapper } from '@app/shared/interfaces/routine-wrapper';

@Component({
  selector: 'app-dialog-scheduling',
  templateUrl: './dialog-scheduling.component.html',
  styleUrls: ['./dialog-scheduling.component.scss']
})
export class DialogSchedulingComponent implements OnInit {

  public tiposRefeicoes: Refeicao[];
  public restaurantes: Restaurante[];
  public diasSemana: Dia[];
  public routine: Routine = <Routine>{};
  public isUpdating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogSchedulingComponent>,
    @Inject(MAT_DIALOG_DATA) private routineWrapper: RoutineWrapper,
    private schedulerService: SchedulerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isUpdating = false;
    this.tiposRefeicoes = this.schedulerService.getTiposRefeicoes();//Destructuring to avoid change the variable in the service
    this.restaurantes = this.schedulerService.getRestaurantes();
    this.diasSemana = this.schedulerService.getDiasSemana();
    if(!isUndefined(this.routineWrapper.docRef)){
      this.isUpdating = true;
      this.mergeWrapperWithRoutine();
    } else {
      this.clearSelects();
    }
  }

  mergeWrapperWithRoutine(){
    this.tiposRefeicoes.forEach((refeicao, index) => {
      this.tiposRefeicoes[index].selected = false;
      this.routineWrapper.data.tiposRefeicao.map((tipoRefeicaoID: number) => {
        if(refeicao.id === tipoRefeicaoID){
          this.tiposRefeicoes[index].selected = true;
        }
      });
    });

    this.diasSemana.forEach((dia, index) => {
      this.diasSemana[index].selected = false;
      this.routineWrapper.data.dias.map((diaID: number) => {
        if(dia.id === diaID){
          this.diasSemana[index].selected = true;
        }
      });
    });

    this.routine.restaurante = this.routineWrapper.data.restaurante;
  }

  clearSelects(){
    this.tiposRefeicoes.forEach((refeicao, index) => {
      this.tiposRefeicoes[index].selected = false;
    });

    this.diasSemana.forEach((dia, index) => {
      this.diasSemana[index].selected = false;
    });
  }

  cancelRoutine(){
    this.isUpdating = false;
    this.dialogRef.close();
  }

  addRoutine(){
    this.prepareRoutineData();
    if(this.isRoutineValid(this.routine)){
      this.schedulerService.addRoutine(this.routine).then((isSuccess: boolean) => {
        if(isSuccess){
          this.routine = <Routine>{};
          this.cancelRoutine();
        }
      })
    }
  }

  updateRoutine(){
    if(this.isUpdating){
      this.prepareRoutineData();
      if(this.isRoutineValid(this.routine)){
        this.routineWrapper.data = this.routine;
        this.schedulerService.updateRoutine(this.routineWrapper).then((isSuccess: boolean) => {
          if(isSuccess){
            this.routine = <Routine>{};
            this.cancelRoutine();
          }
        })
      }
    }
  }

  deleteRoutine(){
    if(this.isUpdating){
      this.schedulerService.deleteRoutine(this.routineWrapper).then((isSuccess: boolean) => {
        if(isSuccess){
          this.routine = <Routine>{};
          this.cancelRoutine();
        }
      })
    }
  }

  prepareRoutineData(){
    this.routine.dias = this.getArrayID(this.diasSemana);
    this.routine.tiposRefeicao = this.getArrayID(this.tiposRefeicoes);
  }

  getArrayID(item: any): any{
    return item.filter(x => x.selected === true)
    .map(x => x.id);
  }

  isEmpty(items: any): boolean{
    return items.length === 0;
  }

  isRoutineValid(routine: Routine){
    const isValid = !this.isEmpty(routine.dias) && !this.isEmpty(routine.tiposRefeicao) && !isUndefined(routine.restaurante);
    if(!isValid){
      let msg: string;
      if(this.isEmpty(this.routine.dias)){
        msg = "Selecione pelo menos um dia.";
      } else if (this.isEmpty(this.routine.tiposRefeicao)){
        msg = "Selecione pelo menos uma refeição.";
      } else {
        msg = "Selecione um restaurante.";
      }
      this.toastr.error(msg);
    }
    return isValid;
  }
}
