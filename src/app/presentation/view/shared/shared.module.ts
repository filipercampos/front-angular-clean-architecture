import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { InputComponent } from './components/input/input.component';
import { DialogRegisterComponent } from './dialogs/dialog-register/dialog-register.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [InputComponent, DialogRegisterComponent, NotificationComponent],
  exports: [InputComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AppMaterialModule],
  entryComponents: [DialogRegisterComponent, NotificationComponent],
})
export class SharedModule {}
