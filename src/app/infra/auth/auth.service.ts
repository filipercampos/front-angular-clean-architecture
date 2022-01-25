import { Injectable } from '@angular/core';
import { UserEntity } from '../../domain/entities/user-entity';

const credentialsKey = 'credentials';
const tokenServer = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario: UserEntity | null = null;

  constructor() {
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);

    if (savedCredentials) {
      this.usuario = JSON.parse(savedCredentials);
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): UserEntity | null {
    return this.usuario;
  }

  set credentials(credentials: UserEntity | null) {
    this.usuario = credentials;

    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
      localStorage.setItem(tokenServer, credentials.token!);
    } else {
      localStorage.removeItem(credentialsKey);
    }
  }
  get token(): string | null {
    return localStorage.getItem('token');
  }
}
