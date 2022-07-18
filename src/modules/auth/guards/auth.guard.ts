import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private service : AuthService) {
}
canActivate(
  next: ActivatedRouteSnapshot,
state: RouterStateSnapshot): boolean {
  if (localStorage.getItem('token') != null){
    let roles = next.data['permittedRoles'] as Array<string>;
    if(roles){
      if(this.service.roleMatch(roles)) return true;
      else{
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    return true;
  }
  else {
    this.router.navigate(['/auth/login']);
    return false;
  }

}
}
