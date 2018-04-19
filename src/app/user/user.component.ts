import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    idProfessor: number;
    email: string;
    password: string;
    password2: string;
    ime: string;
    prezime: string;
    datumPocetak: string = new Date().toDateString();
    datumKraj: string = new Date().toDateString();
    message: string = "";
    officeHoursList: any[];
    officeHour: any;
    constructor(private http: Http) {
    }

    ngOnInit() {
        this.getProfessor().subscribe(
            resBody => {
                this.idProfessor = resBody.idprofessor;
                this.email = resBody.email;
                this.password = resBody.password;
                this.ime = resBody.firstName;
                this.prezime = resBody.lastName;
                this.officeHoursList = resBody.listOfOfficeHours;
                
            },
            error => console.log(error)
        );
    }

    getProfessor() {
        let emailQ = atob(sessionStorage.getItem("email"));
        let passQ = atob(sessionStorage.getItem("password"));
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor?email=' + emailQ + '&password=' + passQ;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map((res: Response) => res.json());
    }

    saveChanges(){
        this.saveChangesInDB().subscribe(resBody => this.message="shit saved!");
    }
    saveChangesInDB() {
        if (this.checkTime()) {
            if (this.checkPassword()) {
                let url = 'https://nst-chatbot.herokuapp.com/rest/professor/save';
                let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
                let options = new RequestOptions({headers: headers});
                let json = "{\"idprofessor\":"+this.idProfessor+",\"email\":\""+this.email+"\",\"password\":\""+this.password+"\",\"firstName\":\""+this.ime+"\",\"lastName\":\""+this.prezime+"\", \"listOfOfficeHours\": "+JSON.stringify(this.officeHoursList)+"}";
                console.log(json);
                return this.http.post(url, json, options).map((res: Response) => res.json());
            }else{
                this.message = "Sifra je manje od 6 karaktera ili nije dobro ponovljena";
            }

        }else{
            this.message = "Razmak izmedju pocetnog i krajnjeg datuma treba biti tacno 3h";
        }
    }


    checkTime(): boolean {
        // let millis = Date.parse(this.datumKraj) - Date.parse(this.datumPocetak);
        // let hours = millis / 1000 / 60 / 60;
        // return hours == 3;
        return true;
    }

    checkPassword(): boolean {
        return this.password == this.password2 && this.password.length >= 6;
    }

    isMessageSet ():boolean {
        return this.message != "";
    }

    addOfficeHour(){
        let json = JSON.parse("{\"beginTime\": \""+this.datumPocetak+"\", \"endTime\": \""+this.datumKraj+"\"}");
        this.officeHoursList.push(json);
    }

    deleteOfficeHour(){
        this.officeHoursList = this.officeHoursList.filter(x => x.id != this.officeHour);
    }


}
