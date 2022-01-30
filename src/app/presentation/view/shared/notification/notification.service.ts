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

  open(err: any, alert?: boolean): Observable<any> {
    const errs: string[] = [];

    if (typeof err == 'string') errs.push(err + '<br>');
    else {
      _.forEach(err, (x: ValidationError) => {
        const msg = x.Message;
        if (msg) errs.push(msg + '<br>');
      });
    }

    if (errs.length > 0 || err.message) {
      this.snackBarRef = this.snackBar.openFromComponent(
        NotificationComponent,
        alert ? this.configAlert : this.configError
      );
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

  private configAlert: MatSnackBarConfig = {
    duration: 4000,
    panelClass: ['yellow-snackbar'],
  };
}
