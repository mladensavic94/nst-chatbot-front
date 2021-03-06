import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfessorService{

    constructor(private http: Http){}


    getProfessor(email: string) {
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor?email='+ email;
        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', atob(sessionStorage.getItem('token')));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res:Response) => res.json());
    }
    getOfficeHours(email: string, id: string) {
        let url = 'https://nst-chatbot.herokuapp.com/rest/appointments/filter?email='+ email +'&id='+id;
        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', atob(sessionStorage.getItem('token')));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res:Response) => res.json());
    }

    login(email: string, password: string){
        let url = 'https://nst-chatbot.herokuapp.com/login';
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let payload = {"email" : email, "password" : password}
        return this.http.post(url, JSON.stringify(payload), {headers: headers})/*.map((res:Response) => {var payload = res.json(); var headers = res.headers;})*/;
    }

    saveProfessor(idProfessor: number, email: string, password: string, ime: string, prezime: string, listOfOfficeHours: any){
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor/save';
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', atob(sessionStorage.getItem('token')));
        let json = {"idprofessor" : idProfessor,
                    "email"  : email,
                    "password" : password,
                    "firstName" : ime,
                    "lastName" : prezime,
                    "listOfOfficeHours" : listOfOfficeHours};
                    let options = new RequestOptions({ headers: headers });
                    
        return this.http.post(url, JSON.stringify(json), options)/*.map((res: Response) => {
            res.json();
        })*/;

    }

    register( email: string, password: string, ime: string, prezime: string, listOfOfficeHours: any){
        let url = 'https://nst-chatbot.herokuapp.com/rest/register';
        let headers = new Headers({'Content-Type': 'application/json'});
        let json = {
                    "email"  : email,
                    "password" : password,
                    "firstName" : ime,
                    "lastName" : prezime,
                    "listOfOfficeHours" : listOfOfficeHours};
                    
        return this.http.post(url, JSON.stringify(json))/*.map((res: Response) => {
            res.json();
        })*/;

    }
}