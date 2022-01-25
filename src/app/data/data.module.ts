import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthRepository } from './repository/auth/auth.repository';
import { DriverRepository } from './repository/driver/driver.repository';
import { UserRepository } from './repository/user/user.repository';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [AuthRepository, UserRepository, DriverRepository],
})
export class DataModule {}
