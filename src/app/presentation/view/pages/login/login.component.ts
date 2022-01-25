import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/infra/auth/auth.service';
import { UserEntity } from '../../../../domain/entities/user-entity';
import { NotificationService } from '../../shared/notification/notification.service';
import { UserController } from './../../../controllers/user/user.controller';

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
        error: (err: any) => this.notification.open(err),
      });
  }

  loginResponse(usuario: UserEntity) {
    if (usuario) {
      this.authService.credentials = usuario;
      this.router.navigateByUrl('/home');
    } else {
      this.snackBar.open('Usuário ou senha inválidos.', undefined, {
        duration: 2000,
      });
    }
  }
}
