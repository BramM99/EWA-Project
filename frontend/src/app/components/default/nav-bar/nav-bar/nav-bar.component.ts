import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../../services/auth.service/token-storage.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    firstname: string;
    role: string;

    constructor(private tokenStorageService: TokenStorageService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.setFirstName();
        this.setRole();
    }

    logOut(): void {
        if (window.confirm('weet u zeker dat u wilt uitloggen?')) {
            this.tokenStorageService.signOut();
            this.router.navigate(['/login'], {relativeTo: this.route});
            this.firstname = null;
            this.role = null;
        }
    }

    setFirstName(): void {
        if (this.tokenStorageService.getUser() !== null){
            this.firstname = this.tokenStorageService.getUser().username;
        }
    }
    setRole(): void {
        if (this.tokenStorageService.getUser() !== null) {
            this.role = this.tokenStorageService.getUser().roles[0];
        }
    }
}
