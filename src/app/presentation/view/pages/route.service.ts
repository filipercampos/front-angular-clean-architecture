import { Injectable } from '@angular/core';
import { Route as ngRoute, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/infra/auth/auth.guard';
import { BaseComponent } from '../base/base.component';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  static withShell(routes: Routes): ngRoute {
    return {
      path: '',
      component: BaseComponent,
      children: routes,
      canActivate: [AuthGuard],
    };
  }
}
