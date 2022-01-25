import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginModule, HomeModule, PagesRoutingModule],
  exports: [PagesRoutingModule],
})
export class PagesModule {}
