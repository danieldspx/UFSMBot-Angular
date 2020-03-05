import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RoutineWrapper } from '@app/shared/interfaces/routine-wrapper';
import { AccountService } from '@app/shared/services/account/account.service';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { SchedulerService } from '@app/shared/services/schedule/scheduler.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined, isUndefined } from 'util';
import { DialogAccountDetailsComponent } from '../components/dialog-account-details/dialog-account-details.component';
import { DialogSchedulingComponent } from '../components/dialog-scheduling/dialog-scheduling.component';
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
  public banUntil: any = null;
  public banStatus: boolean = false;

  constructor(
    public dialog: MatDialog,
    private schedulerService: SchedulerService,
    private deviceService: DeviceDetectorService,
    private auth: AuthService,
    private accountService: AccountService,
    private toastr: ToastrService,
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
    this.accountService.hasEmail()
    .then((hasEmail) => {
      if(!hasEmail){
        this.dialog.open(DialogAccountDetailsComponent, {
          width: '70%',
          panelClass: this.dialogClassWidth
        });
      }
    });
    this.checkBanned();
  }

  openScheduleDialog(routine?: RoutineWrapper): void {
    if(this.banStatus){
      this.toastr.warning('Você não pode criar a rotina se estiver banido.');
      return;
    }

    if(isUndefined(routine)){
      routine = <RoutineWrapper>{};
    }
    const dialogRef = this.dialog.open(DialogSchedulingComponent, {
      width: '70%',
      data: routine,
      panelClass: this.dialogClassWidth,
      closeOnNavigation: true
    });
  }

  openWelcomeDialog(){
    this.dialog.open(DialogWelcomeComponent, {
      width: '70%',
      panelClass: this.dialogClassWidth,
      closeOnNavigation: true
    });
  }

  signOut(){
    this.auth.signOut();
  }

  async checkBanned(){
    const today = new Date();
    let account = await this.accountService.getInfo();
    if(!isNullOrUndefined(account.banUntil)){
      this.banUntil = account.banUntil.toDate();
      this.banStatus = this.banUntil.getTime() >= today.getTime();
    }
  }

  scheduleNowForMe(){
    
  }

}
