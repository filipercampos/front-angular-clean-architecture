import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FooterComponent } from './../shared/components/footer/footer.component';
import { HeaderComponent } from './../shared/components/header/header.component';
import { NavComponent } from './../shared/components/nav/nav.component';
import { BaseComponent } from './base.component';

@NgModule({
  declarations: [BaseComponent, HeaderComponent, NavComponent, FooterComponent],
  imports: [CommonModule, RouterModule, TranslateModule, AppMaterialModule],
})
export class BaseModule {}
