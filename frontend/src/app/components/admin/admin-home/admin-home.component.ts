import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
    public users: any;
    public selectedUser: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.restGetAllUsers().subscribe(data => {
            this.users = data;
            console.log(this.users);
        });
    }


    private restGetAllUsers(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/user/getAll`);
    }

    public onSelect(user: any): void{

    }

}
