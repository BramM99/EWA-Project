import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EditprofileService} from '../../../services/editprofile.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  @ViewChild('passwordInput') input;
  public profileForm: FormGroup;

  constructor(private editprofileService: EditprofileService, private router: Router) {
  }


  ngOnInit(): void {
    this.profileForm = new FormGroup({
      password: new FormControl(null, Validators.required)
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

  saveInfo(): void {
    const id: number = JSON.parse(sessionStorage.getItem('auth-user')).id;
    const password: string = this.profileForm.value.password;
    this.editprofileService.putNewPassword(id, password).subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Wachtwoord succesvol verandert!',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['editprofile']);
        },
        () => {
          Swal
              .fire({
                icon: 'error',
                title: 'Er is iets foutgegaan'
              });
        }, () => {
          this.clearForm();
        }
    );
  }

  clearForm(): void {
    this.profileForm.reset();
  }

}
