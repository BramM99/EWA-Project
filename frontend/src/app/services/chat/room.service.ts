import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  API_URL = `${environment.apiUrl}/api/chat/room`;

  constructor(private http: HttpClient) { }

  getRoomForUser(id: string): Observable<any> {
    return this.http.get(this.API_URL + `/${id}`, {
      responseType: 'json',
      headers: new HttpHeaders(
          {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'})
    });
  }

    getFromRoomId(roomId: number): Observable<any> {
        return this.http.get(`${this.API_URL}/roomid/${roomId}`);
    }
}
