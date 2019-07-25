import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  signIn() {
    this.authService.login(this.form.value)
      .subscribe(result => {
        if (result) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else {
          this.invalidLogin = true;
        }
      }, () => {
        this.invalidLogin = true;
      });
  }
}
