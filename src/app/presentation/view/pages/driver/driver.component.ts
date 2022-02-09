import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DriverEntity } from '@domain/entities/driver-entity';
import { DriverController } from '@presentation/controllers/driver/driver.controller';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { DialogRegisterComponent } from '../../shared/dialogs/dialog-register/dialog-register.component';
import { NotificationService } from './../../shared/notification/notification.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator?: MatPaginator;
  isLoading: boolean = false;
  drivers: DriverEntity[] = [];
  displayedColumns: string[] = ['name', 'phone', 'birth_date', 'documents', 'action'];
  dataSource: any;

  constructor(
    private controller: DriverController,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.isLoading = true;

    this.controller
      .get()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((driver: DriverEntity) => {
        this.drivers.push(driver);
        this.dataSource = new MatTableDataSource(this.drivers);
        this.dataSource.paginator = this.paginator;
      });
  }

  newDriver() {
    this.openDialog();
  }

  edit(param: DriverEntity) {
    this.openDialog(param);
  }

  deleteDriver(e: DriverEntity) {
    const index = this.drivers.indexOf(e);
    this.drivers.splice(index, 1);
    this.controller.delete(e).subscribe({
      next: () => {
        this.dataSource = new MatTableDataSource(this.drivers);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => this.notification.showError(err),
    });
  }

  disableEnable(param: DriverEntity) {
    param.enable = !param.enable;
    this.controller.disableEnable(param.id as number, param.enable);
  }

  openDialog(driver?: DriverEntity) {
    const dialogRef = this.dialog.open(DialogRegisterComponent, {
      width: '650px',
      data: driver ? driver : null,
    });

    dialogRef.afterClosed().subscribe((result) => this.responseDialog(result));
  }

  responseDialog(result: any) {
    if (result) {
      const index = _.findIndex(this.drivers, ['id', result.id]);
      if (index !== -1) {
        this.drivers[index] = result;
      } else {
        this.drivers.push(result);
      }
      this.dataSource = new MatTableDataSource(this.drivers);
      this.dataSource.paginator = this.paginator;
    }
  }
}
