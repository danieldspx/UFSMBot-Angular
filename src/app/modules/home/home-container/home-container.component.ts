import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { isUndefined } from 'util';

import { DeviceDetectorService } from 'ngx-device-detector';

import { AuthService } from '@app/shared/services/auth/auth.service';

import { DialogSchedulingComponent } from '../components/dialog-scheduling/dialog-scheduling.component';
import { SchedulerService } from '@app/shared/services/schedule/scheduler.service';
import { RoutineWrapper } from '@app/shared/interfaces/routine-wrapper';


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
    private schedulerService: SchedulerService,
    private deviceService: DeviceDetectorService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.schedulerService.getAllRoutines()
    .then((routines: RoutineWrapper[] | boolean) => {
      if(routines !== false){
        this.allRoutines = <RoutineWrapper[]>routines;
        this.hasRoutines = this.allRoutines.length !== 0;
      }
    });
    this.schedulerService.routineNotifications.subscribe(hasUpdate => {
      if(hasUpdate){
        this.allRoutines = this.schedulerService.getRoutinesUpdated();
        this.hasRoutines = this.allRoutines.length !== 0;
      }
    })
  }

  openScheduleDialog(routine?: RoutineWrapper): void {
    if(isUndefined(routine)){
      routine = <RoutineWrapper>{};
    }
    let dialogClassWidth = this.deviceService.isMobile ? 'full-width-dialog' : '';
    const dialogRef = this.dialog.open(DialogSchedulingComponent, {
      width: '70%',
      data: routine,
      panelClass: dialogClassWidth
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  signOut(){
    this.auth.signOut();
  }

}
