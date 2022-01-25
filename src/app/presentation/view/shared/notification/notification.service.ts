import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
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

      errs.push(msg + '<br>');
    });

    this.snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {
      duration: 2000,
    });

    this.snackBarRef.instance.message = _.join(errs, ' ');

    return this.snackBarRef.onAction();
  }
}
