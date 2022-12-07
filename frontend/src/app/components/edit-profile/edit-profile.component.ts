import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {EditprofileService} from '../../services/editprofile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private editprofileService: EditprofileService) {
  }

  @ViewChild('passwordInput') input;
  public profileForm: FormGroup;
  private user: User;

  private static formatDate(date): any {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }


  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, Validators.required),
      emailaddress: new FormControl(null, [Validators.required, Validators.email]),
    });
    const id = JSON.parse(sessionStorage.getItem('auth-user')).id;
    this.editprofileService.findUserDetails(id).subscribe(
        data => {
          this.user = data as User;
          this.profileForm.patchValue({
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            dateOfBirth: EditProfileComponent.formatDate(this.user.dateOfBirth),
            zipcode: this.user.zipcode,
            emailaddress: this.user.email
          });
        }
    );
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
    const value = this.profileForm.value;
    const id = JSON.parse(sessionStorage.getItem('auth-user')).id;
    const user = new User(id, value.firstname, value.lastname, value.dateOfBirth, value.zipcode,
        value.emailaddress, this.user.password);
    this.editprofileService.putNewUserDetails(user).subscribe(
        () => {
          console.log('Nieuwe data:' + user as unknown as User);
        }
    );
  }

  clearForm(): void {
    this.profileForm.reset();
  }

}
