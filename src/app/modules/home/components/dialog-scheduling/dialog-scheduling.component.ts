import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ToastrService } from 'ngx-toastr';

import { Routine } from '@app/shared/interfaces/routine';
import { Refeicao } from '@app/shared/interfaces/refeicao';
import { Restaurante } from '@app/shared/interfaces/restaurante';
import { Dia } from '@app/shared/interfaces/dia';

import { SchedulerService } from '@app/shared/services/schedule/scheduler.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-dialog-scheduling',
  templateUrl: './dialog-scheduling.component.html',
  styleUrls: ['./dialog-scheduling.component.scss']
})
export class DialogSchedulingComponent implements OnInit {

  public tiposRefeicoes: Refeicao[];
  public restaurantes: Restaurante[];
  public diasSemana: Dia[];

  constructor(
    public dialogRef: MatDialogRef<DialogSchedulingComponent>,
    @Inject(MAT_DIALOG_DATA) public routine: Routine,
    private schedulerService: SchedulerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.tiposRefeicoes = [...this.schedulerService.tiposRefeicoes];//Destructuring to avoid change the variable in the service
    this.restaurantes = [...this.schedulerService.restaurantes];
    this.diasSemana = [...this.schedulerService.diasSemana];
  }

  cancelRoutine(){
    this.dialogRef.close();
  }

  addRoutine(){
    this.routine.dias = this.getArrayID(this.diasSemana);
    this.routine.tiposRefeicao = this.getArrayID(this.tiposRefeicoes);
    if(this.isRoutineValid(this.routine)){
      this.schedulerService.addRoutine(this.routine).then((isSuccess: boolean) => {
        if(isSuccess){
          this.routine = <Routine>{};
          this.cancelRoutine();
        }
      })
    } else {
      let msg;
      if(this.isEmpty(this.routine.dias)){
        msg = "Selecione pelo menos um dia.";
      } else if (this.isEmpty(this.routine.tiposRefeicao)){
        msg = "Selecione pelo menos uma refeição.";
      } else {
        msg = "Selecione um restaurante.";
      }
      this.toastr.error(msg);
    }
  }

  getArrayID(item: any): any{
    return item.filter(x => x.selected === true)
    .map(x => x.id);
  }

  isEmpty(items: any): boolean{
    return items.length === 0;
  }

  isRoutineValid(routine: Routine){
    return !this.isEmpty(routine.dias) && !this.isEmpty(routine.tiposRefeicao) && !isUndefined(routine.restaurante)
  }
}
