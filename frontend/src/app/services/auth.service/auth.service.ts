import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


const AUTH_API = `${environment.apiUrl}/api/auth`;

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {
    }

    login(credentials): Observable<any> {
        return this.http.post(AUTH_API + '/signin', {
            email: credentials.email,
            password: credentials.password
        }, httpOptions);
    }

    register(user): Observable<any> {
        return this.http.post(AUTH_API + '/signup', {
            firstname: user.firstname,
            lastname: user.lastname,
            dateOfBirth: user.dateOfBirth,
            zipcode: user.zipcode,
            email: user.email,
            password: user.password
        }, httpOptions);
    }

    registerDocter(user): Observable<any> {
        return this.http.post(AUTH_API + '/signup', {
            firstname: user.firstname,
            lastname: user.lastname,
            dateOfBirth: user.birthDate,
            zipCode: user.zipcode,
            email: user.email,
            password: user.password,
            specialiteit: user.speciality,
            big: user.big,
            telefoonNummer: user.pnumber,
            roles: user.role
        }, httpOptions);
    }
}
