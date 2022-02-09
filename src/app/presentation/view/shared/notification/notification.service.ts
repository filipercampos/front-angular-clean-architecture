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

  showError(err: any, style?: NotificationStyle): Observable<any> {
    const errs: string[] = [];
    if (typeof err == 'string') errs.push(err + '<br>');
    else {
      _.forEach(err, (x: ValidationError) => {
        const msg = x.Message;
        if (msg) errs.push(msg + '<br>');
      });
    }
    this.snackBarRef = this.snackBar.openFromComponent(
      NotificationComponent,
      style ? this.configWarning : this.configError
    );
    this.snackBarRef.instance.message = _.join(errs, ' ');
    return this.snackBarRef.onAction();
  }

  showSnack(message: string, style?: NotificationStyle): Observable<any> {
    let snackConfig = undefined;
    switch (style) {
      case NotificationStyle.SUCCESS:
        snackConfig = this.configSuccess;
        break;
      case NotificationStyle.WARNING:
        snackConfig = this.configWarning;
        break;
      case NotificationStyle.ERROR:
        snackConfig = this.configError;
        break;
    }
    this.snackBarRef = this.snackBar.openFromComponent(NotificationComponent, snackConfig);
    this.snackBarRef.instance.message = message;
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

  private configWarning: MatSnackBarConfig = {
    duration: 4000,
    panelClass: ['yellow-snackbar'],
  };
}
export enum NotificationStyle {
  DEFAULT = 0,
  SUCCESS = 1,
  WARNING = 2,
  ERROR = 3,
}
