import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IDialogController } from 'src/app/domain/interfaces/idialog-controller';
import { DriverController } from './controllers/driver/driver.controller';
import { UserController } from './controllers/user/user.controller';
import { ViewModule } from './view/view.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ViewModule],
  exports: [ViewModule],
  providers: [
    { provide: IDialogController, useClass: DriverController },
    UserController,
    DriverController,
  ],
})
export class PresentationModule {}
