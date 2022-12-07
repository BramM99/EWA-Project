import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EditprofileService {

  headers = new HttpHeaders({
        'Content-Type': 'application/json'
      }
  );
  API_URL = `${environment.apiUrl}/api/user`;

  constructor(private httpClient: HttpClient) {
  }

  findUserDetails(id: number) {
    return this.httpClient.get(`${this.API_URL}/${id}`);
  }

  putNewUserDetails(user: User) {
    return this.httpClient.put(`${this.API_URL}/${user.id}`, user);
  }

  putNewPassword(userId: number, password: string) {
    return this.httpClient.put(`${this.API_URL}/password/${userId}`, {password, });
  }
}
