import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogSchedulingComponent } from '../components/dialog-scheduling/dialog-scheduling.component';
import { SchedulerService } from '@app/shared/services/schedule/scheduler.service';
import { RoutineWrapper } from '@app/shared/interfaces/routine-wrapper';
import { isUndefined } from 'util';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  public hasRoutines: boolean = false;
  public allRoutines: RoutineWrapper[] = [];
  public presentationRoutines: any[] = [];

  constructor(
    public dialog: MatDialog,
    private schedulerService: SchedulerService
  ) { }

  ngOnInit() {
    this.schedulerService.getAllRoutines()
    .then((routines: RoutineWrapper[] | boolean) => {
      if(routines !== false){
        this.allRoutines = <RoutineWrapper[]>routines;
        this.hasRoutines = this.allRoutines.length !== 0;
      }
    });
  }

  openScheduleDialog(routine: RoutineWrapper): void {
    if(isUndefined(routine)){
      routine = <RoutineWrapper>{};
    }
    const dialogRef = this.dialog.open(DialogSchedulingComponent, {
      width: '70%',
      data: routine
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
