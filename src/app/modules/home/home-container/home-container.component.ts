import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogSchedulingComponent } from '../components/dialog-scheduling/dialog-scheduling.component';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openScheduleDialog(): void {
    const dialogRef = this.dialog.open(DialogSchedulingComponent, {
      width: '70%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
