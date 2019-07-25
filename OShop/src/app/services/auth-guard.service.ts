import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    // if (this.authService.isLoggedIn) return true;

    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;
    // return this.authService.isLoggedIn.pipe(take(1)).subscribe((isLoggedIn) => {
    //   if (!isLoggedIn) {
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    //   }
    //   return true;
    // })
    // return this.authService.isLoggedIn.pipe(take(1));
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
        return true;
      })
    );
  }
}
