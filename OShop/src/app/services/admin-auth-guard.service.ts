import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    let user;
    this.authService.currentUser$
    .subscribe(currentUser => user = currentUser);
    if (user && user.isAdmin == "True") return true;

    if (user) {
      this.router.navigate(['/no-access']);
    }
    return false;
  }
}
