import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteService } from '../route.service';
import { DriverComponent } from './driver.component';

const routes: Routes = [
  RouteService.withShell([
    { path: '', redirectTo: '/drivers', pathMatch: 'full' },
    {
      path: 'drivers',
      component: DriverComponent,
      data: {
        title: 'Driver',
      },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutingModule {}
