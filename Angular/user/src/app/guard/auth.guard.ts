import { Injectable } from '@angular/core';
import { Router , CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router:Router , private authService:AuthService){}

  canActivate() {
    if (this.authService.loggedIn()) {
        return true;
    } else {
        this.router.navigate(['/home']);
        return false;
    }
  }
}
