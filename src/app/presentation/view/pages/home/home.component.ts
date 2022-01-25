import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { DriverEntity } from '../../../../domain/entities/driver-entity';
import { DialogRegisterComponent } from '../../shared/dialogs/dialog-register/dialog-register.component';
import { DriverController } from './../../../controllers/driver/driver.controller';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator?: MatPaginator;

  isLoading: boolean = false;
  drivers: DriverEntity[] = [];
  displayedColumns: string[] = ['name', 'phone', 'birth_date', 'documents', 'action'];
  dataSource: any;

  constructor(private controller: DriverController, private dialog: MatDialog) {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
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
      .subscribe((driver: DriverEntity | null) => {
        this.drivers.push(driver ?? new DriverEntity());
        this.dataSource = new MatTableDataSource(this.drivers);
        this.dataSource.paginator = this.paginator; //NEW
      });
  }

  newDriver() {
    this.openDialog();
  }

  edit(param: DriverEntity) {
    this.openDialog(param);
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
    }
  }
}
