import {Component, OnInit, ViewChild} from '@angular/core';

import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    @ViewChild('passwordInput') input;
    signUpForm: FormGroup;

    constructor(private authService: AuthService,
                private router: Router) {
    }


    ngOnInit(): void {
        this.signUpForm = new FormGroup({
            'firstname': new FormControl(null, Validators.required),
            'lastname': new FormControl(null, Validators.required),
            'dateOfBirth': new FormControl(null, Validators.required),
            'zipcode': new FormControl(null, Validators.required),
            'emailaddress': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required),
        });
    }

    togglePassword(): void {
        const x = this.input.nativeElement;
        if (x.type === 'password') {
            x.type = 'text';
        } else {
            x.type = 'password';
        }
    }

    register(): void {
        const value = this.signUpForm.value;
        const user = new User(0, value.firstname, value.lastname, value.dateOfBirth, value.zipcode,
            value.emailaddress, value.password);
        this.authService.register(user).subscribe(
            () => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'U bent succesvol geregistreerd!',
                    showConfirmButton: false,
                    timer: 1000
                });
                // this.router.navigate(['home']);
            },
            () => {
                Swal
                    .fire({
                        icon: 'error',
                        title: 'U heeft nog niet alle verplichten velden ingevuld!'
                    });
            }, () => {
                this.clearForm();
            }
        );
    }

    clearForm(): void {
        this.signUpForm.reset();
    }

}
