import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service/auth.service';
import {TokenStorageService} from '../../../../services/auth.service/token-storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public form: any = {};
    public isLoggedIn = false;
    public isLoginFailed = false;
    public errorMessage = '';
    public roles: string[] = [];

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
    }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            if (this.roles.indexOf('ROLE_DOCTOR') >= 0) {
                this.router.navigate(['/patient-menu']);
            } else {
                this.router.navigate(['/patientpanel']);
            }
        }
    }
    onSubmit(): void {
        this.authService.login(this.form).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
                this.router.navigate(['/patientpanel']);
                this.reloadPage();
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage(): void {
        window.location.reload();
    }

}
