import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DriverModule } from './driver/driver.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginModule, HomeModule, DriverModule, PagesRoutingModule],
  exports: [PagesRoutingModule],
})
export class PagesModule {}
