import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from './auth.service/token-storage.service';
import {Role} from '../models/Role';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(readonly tokens: TokenStorageService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.tokens.getUser()) {
            this.router.navigate(['login']);
            return false;
        }
        if (route.data.roles === null){
            return false;
        }

        const roles = route.data.roles as Role[];
        if (roles) {
            switch (this.tokens.getUser().roles[0]) {
                case 'ROLE_PATIENT': {
                    if (roles[0] === Role.patient) {
                        return true;
                    }
                    break;
                }
                case 'ROLE_DOCTOR': {
                    if (roles[0] === Role.docter) {
                        return true;
                    }
                    break;
                }
                case 'ROLE_ADMIN': {
                    if (roles[0] === Role.admin) {
                        return true;
                    }
                    break;
                }

            }
        }
        return false;
    }
}
