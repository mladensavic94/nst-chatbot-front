import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    email: string = "";
    password: string = "";
    password2: string = "";
    ime: string = "";
    prezime: string = "";
    datumPocetak: string;
    datumKraj: string;
    message: string = "";

    constructor(private http: Http) {
    }

    ngOnInit() {
    /*    this.getProfessor().subscribe(
            resBody => {
                this.email = resBody.email;
                this.password = resBody.password;
                this.ime = resBody.firstName;
                this.prezime = resBody.lastName;
            },
            error => console.log(error)
        );
        this.getOfficeHours().subscribe(
            resBody => {
                this.datumPocetak = resBody[0].beginTime;
                this.datumKraj = resBody[0].endTime;
            },
            error => console.log(error)
        );*/
    }

    getProfessor() {
        let emailQ = atob(localStorage.getItem("email"));
        let passQ = atob(localStorage.getItem("password"));
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor?email=' + emailQ + '&password=' + passQ;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map((res: Response) => res.json());
    }

    getOfficeHours() {
        let emailQ = atob(localStorage.getItem("email"));
        let url = 'https://nst-chatbot.herokuapp.com/rest/officehours?email=' + emailQ;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map((res: Response) => res.json());
    }

    saveChanges() {
        if (this.checkTime()) {
            if (this.checkPassword()) {
                let url = 'https://nst-chatbot.herokuapp.com/rest/officehours';
                let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
                let options = new RequestOptions({headers: headers});
                let json = "{\"professor\":{\"idprofessor\":3,\"email\":\"" + this.email + "\",\"password\":\"" + this.password + "\",\"firstName\":\"" + this.ime + "\",\"lastName\":\"" + this.prezime + "\"},\"beginTime\":\"" + this.datumPocetak + "\",\"endTime\":\"" + this.datumKraj + "\"}";
                console.log(json);
                // this.http.post(url, json, options).map((res: Response) => res.json());
                this.message = "";

            }else{
                this.message = "Sifra je manje od 6 karaktera ili nije dobro ponovljena";
            }

        }else{
            this.message = "Razmak izmedju pocetnog i krajnjeg datuma treba biti tacno 3h";
        }
    }


    checkTime(): boolean {
        let millis = Date.parse(this.datumKraj) - Date.parse(this.datumPocetak);
        let hours = millis / 1000 / 60 / 60;
        return hours == 3;
    }

    checkPassword(): boolean {
        return this.password == this.password2 && this.password.length >= 6;
    }

    isMessageSet ():boolean {
        return this.message != "";
    }


}
