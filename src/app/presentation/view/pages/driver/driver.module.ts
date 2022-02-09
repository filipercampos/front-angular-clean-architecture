import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';

@NgModule({
  declarations: [DriverComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    AppMaterialModule,
    DriverRoutingModule,
  ],
})
export class DriverModule {}
