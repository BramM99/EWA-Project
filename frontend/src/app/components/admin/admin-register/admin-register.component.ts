import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service/auth.service';


@Component({
    selector: 'app-admin-register',
    templateUrl: './admin-register.component.html',
    styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
    public form: any = {};

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log(this.form);
        this.authService.registerDocter(this.form).subscribe(
            data => {
               console.log(data);
            },
            err => {
                console.log(err);
            }
        );
    }
}

