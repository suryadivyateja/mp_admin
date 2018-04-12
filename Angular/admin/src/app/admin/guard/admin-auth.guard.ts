import { Injectable } from '@angular/core';
import { Router , CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from '../../services/admin.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router , private adminService: AdminService ) {}

  canActivate() {
    if (this.adminService.loggedIn() === true) {
        return true;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
}
}
