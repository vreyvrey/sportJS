import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from "./user.service";

@Injectable()
export class GuardConnectedUserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // if (this.userService.isLoggedIn()) { // ne marche pas vraiment car sur un F5, le temps que l'appli récupère les infos du serveur, il est trop tard : on croit qu'il est déconnecté
    //  return true;
    // }
    return this.userService.getUser$().filter(user => user !== undefined).map(user => !!user).do(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
    // Le mécanisme de GUARD SOUSCRIT AUTOMATIQUEMENT AUX OBSERVABLES

  }
}
