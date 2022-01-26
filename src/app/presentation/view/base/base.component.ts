import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infra/auth/auth.service';
import { UserEntity } from '../../../domain/entities/user-entity';
import { UserController } from '../../controllers/user/user.controller';
import { AppPages } from './../../../constants/app_pages';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userController: UserController,
    private router: Router
  ) {}

  ngOnInit() {}

  get usuario(): UserEntity | null {
    return this.authService.credentials;
  }

  logout() {
    this.userController.logout().subscribe(() => this.responseLogout());
  }

  responseLogout() {
    this.authService.credentials = null;
    this.router.navigateByUrl(AppPages.LOGIN, { replaceUrl: true });
  }
}
