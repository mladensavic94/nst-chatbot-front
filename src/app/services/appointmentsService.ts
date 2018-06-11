import {RequestOptions, Headers, Response, Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";

@Injectable()
export class AppointmentsService{

    constructor(private http: Http){}

    getAppointments(email: string) {
        let url = 'https://nst-chatbot.herokuapp.com/rest/appointments?email=' + email;
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', atob(sessionStorage.getItem('token')));
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map((res: Response) => res.json());
    }

    changeState(id: string, state: string, length: number){
        let url = "https://nst-chatbot.herokuapp.com/rest/appointments/update";
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', atob(sessionStorage.getItem('token')));
        let options = new RequestOptions({headers: headers});
        let json = {"id": id, "status": state, "length": length};      
        alert(JSON.stringify(json))  
        return this.http.post(url,JSON.stringify(json), options).map((res: Response) => res.json());
    }
}