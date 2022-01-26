import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ValidationError } from 'ts.validator.fluent/dist';
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBarRef!: MatSnackBarRef<NotificationComponent>;

  constructor(private snackBar: MatSnackBar) {}

  open(err: any): Observable<any> {
    const errs: string[] = [];

    _.forEach(err, (x: ValidationError) => {
      const msg = x.Message;
      if (msg) errs.push(msg + '<br>');
    });

    if (errs.length > 0 || err.message) {
      errs.push(err.message);
      this.snackBarRef = this.snackBar.openFromComponent(NotificationComponent, this.configError);
    } else {
      this.snackBarRef = this.snackBar.openFromComponent(NotificationComponent, this.configSuccess);
    }

    this.snackBarRef.instance.message = _.join(errs, ' ');

    return this.snackBarRef.onAction();
  }
  private configSuccess: MatSnackBarConfig = {
    duration: 4000,
    panelClass: ['blue-snackbar'],
  };

  private configError: MatSnackBarConfig = {
    duration: 4000,
    panelClass: ['red-snackbar'],
  };
}
