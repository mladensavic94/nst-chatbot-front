import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfessorService{

    constructor(private http: Http){}


    getProfessor(email: string, password: string) {
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor?email='+ email +'&password=' + password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res:Response) => res.json());
    }

    saveProfessor(idProfessor: number, email: string, password: string, ime: string, prezime: string, listOfOfficeHours: any){
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor/save';
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let json = {"idProfessor" : idProfessor,
                    "email"  : email,
                    "password" : password,
                    "firstName" : ime,
                    "lastName" : prezime,
                    "listOfOfficeHours" : listOfOfficeHours};
        return this.http.post(url, JSON.stringify(json)).map((res: Response) => {
            res.json();
        });

    }
}