import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { BaseComponent } from './base.component';

@NgModule({
  declarations: [BaseComponent],
  imports: [CommonModule, RouterModule, TranslateModule, AppMaterialModule],
})
export class BaseModule {}
