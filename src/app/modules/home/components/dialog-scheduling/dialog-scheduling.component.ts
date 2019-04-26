import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Routine } from '@app/shared/interfaces/routine';
import { Refeicao } from '@app/shared/interfaces/refeicao';
import { Restaurante } from '@app/shared/interfaces/restaurante';
import { Dia } from '@app/shared/interfaces/dia';

import { SchedulerService } from '@app/shared/services/scheduler.service';

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
    private schedulerService: SchedulerService
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
    console.log(1);
  }
}
