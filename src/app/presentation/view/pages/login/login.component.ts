import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserEntity } from '@domain/entities/user-entity';
import { UserController } from '@presentation/controllers/user/user.controller';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/infra/auth/auth.service';
import { AppPages } from 'src/app/shared/constants/app_pages';
import {
  NotificationService,
  NotificationStyle,
} from '../../shared/notification/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private notification: NotificationService,
    private controller: UserController
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.isLoading = true;

    this.controller
      .login(this.form.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (usuario: UserEntity) => this.loginResponse(usuario),
        error: (err: any) => this.notification.showError(err),
      });
  }

  loginResponse(user: UserEntity) {
    if (user && user.token) {
      this.authService.credentials = user;
      this.router.navigateByUrl(AppPages.HOME);
    } else {
      if (user) {
        this.notification.showSnack('Sessão expirada', NotificationStyle.WARNING);
      } else {
        this.snackBar.open('Usuário ou senha inválidos.', undefined, {
          duration: 3000,
        });
      }
    }
  }
}
