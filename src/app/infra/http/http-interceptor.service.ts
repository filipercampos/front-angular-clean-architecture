import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationError } from 'ts.validator.fluent/dist';
import { AppPages } from '../../shared/constants/app_pages';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.credentials) {
      req = req.clone({
        setHeaders: {
          'X-API-Key': `${this.authService.credentials.token}`,
        },
      });

      return next.handle(req).pipe(catchError((error) => this.errorHandler(error)));
    } else {
      return next.handle(req).pipe(catchError((error) => this.errorHandler(error)));
    }
  }

  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    let errs: any[] = [];
    let message = response.message;
    if (response.error.message) {
      message = response.error.message;
      errs.push(message);
    } else {
      errs.push(message);
    }
    console.error(`${HttpInterceptorService.name}: status ${response.status}\n${message}`);

    switch (response.status) {
      case 0:
        errs.push(new ValidationError('', '', `<strong>Serviço indisponível</strong>`));
        break;
      case 400:
        errs.push(new ValidationError('', '', `<strong>400</strong>: Bad Request<br> ${message}`));
        break;
      case 401:
      case 403:
        errs.push(new ValidationError('', '', `<strong>Unauthorized</strong><br>${message}`));
        this.router.navigateByUrl(AppPages.LOGIN, { replaceUrl: true });
        break;
      case 404:
        errs.push(new ValidationError('', '', `<strong>Not found</strong><br>${message}`));
        break;
      case 406:
      //handle
      case 409:
      //handle
      case 500:
        errs.push(new ValidationError('', '', `<strong>${response.status}</strong><br>${message}`));
        break;
    }

    return throwError(() => errs);
  }
}
