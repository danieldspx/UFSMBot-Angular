import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { isUndefined } from 'util';

import { DeviceDetectorService } from 'ngx-device-detector';

import { AuthService } from '@app/shared/services/auth/auth.service';

import { DialogSchedulingComponent } from '../components/dialog-scheduling/dialog-scheduling.component';
import { SchedulerService } from '@app/shared/services/schedule/scheduler.service';
import { RoutineWrapper } from '@app/shared/interfaces/routine-wrapper';
import { DialogWelcomeComponent } from '../components/dialog-welcome/dialog-welcome.component';


@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  public hasRoutines: boolean = false;
  public allRoutines: RoutineWrapper[] = [];
  public presentationRoutines: any[] = [];
  public dialogClassWidth: string = '';

  constructor(
    public dialog: MatDialog,
    private schedulerService: SchedulerService,
    private deviceService: DeviceDetectorService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.dialogClassWidth = this.deviceService.isMobile ? 'full-width-dialog' : '';
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
    });
    this.auth.isFirstLogin()
    .then(isFirstLogin  => {
      if(isFirstLogin){
        this.openWelcomeDialog();
      }
    })
  }

  openScheduleDialog(routine?: RoutineWrapper): void {
    if(isUndefined(routine)){
      routine = <RoutineWrapper>{};
    }
    const dialogRef = this.dialog.open(DialogSchedulingComponent, {
      width: '70%',
      data: routine,
      panelClass: this.dialogClassWidth
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openWelcomeDialog(){
    const dialogRef = this.dialog.open(DialogWelcomeComponent, {
      width: '70%',
      panelClass: this.dialogClassWidth
    });
  }

  signOut(){
    this.auth.signOut();
  }

}
