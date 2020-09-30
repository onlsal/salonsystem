import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnerService } from './srvs/owner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private ownsrv: OwnerService,
    private router: Router
  ) {}
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("authguard",this.ownsrv.owner);
    let flg:boolean=false;
    if (this.ownsrv.owner.mail == null || typeof this.ownsrv.owner.mail == 'undefined' ){
      this.router.navigate([ '/home' ]);
      return false;
    } else if (this.ownsrv.owner.flgEx) {
      return true;
    } else {
      this.router.navigate([ '/regist' ]);
      return false;  
    }
  }
}
