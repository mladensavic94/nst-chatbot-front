import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { ProfessorService } from '../services/professorService';

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

    constructor(private http: Http, private professorService: ProfessorService) {
    }

    ngOnInit() {
        this.professorService.getProfessor(atob(sessionStorage.getItem("email")), atob(sessionStorage.getItem("password"))).subscribe(
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

    saveChanges(){
        if (this.checkTime()) {
            if (this.checkPassword()) {
                this.professorService.saveProfessor(this.idProfessor, this.email,this.password,this.ime, this.prezime, this.officeHoursList).subscribe(resBody => this.message="shit saved!");
            }
            else{
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


}
