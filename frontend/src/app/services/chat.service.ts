import { Injectable } from '@angular/core';
import {ChatMessage} from '../models/ChatMessage';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  API_URL = `${environment.apiUrl}/api/chat`;

  chatMessages: ChatMessage[];
  constructor(private http: HttpClient) { }

  findAllForRoom(roomId: number): Observable<any> {
    const params = new HttpParams().set('id', String(roomId));
    return this.http.get(this.API_URL, {params,
      responseType: 'json',
      headers: new HttpHeaders(
          {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'})
    });
  }
}
