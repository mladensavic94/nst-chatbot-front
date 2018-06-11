import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { ProfessorService } from '../services/professorService';
declare var $: any;
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
    datumPocetak: Date = new Date();
    datumKraj: Date = new Date();
    message: string = "";
    officeHoursList: any[];
    officeHour: any;


    constructor(private http: Http, private professorService: ProfessorService) {
        this.datumKraj.setTime(this.datumPocetak.getTime() + (3 * 60 * 60 * 1000));
    }

    ngOnInit() {
        this.professorService.getProfessor(atob(sessionStorage.getItem("email"))).subscribe(
            resBody => {
                this.idProfessor = resBody.idprofessor;
                this.email = resBody.email;
                this.password = resBody.password;
                this.password2 = resBody.password;
                this.ime = resBody.firstName;
                this.prezime = resBody.lastName;
                this.officeHoursList = resBody.listOfOfficeHours;
            },
            error => console.log(error)
        );
        $('#timepicker1').timepicker({
            showInputs: false,
            timeFormat: 'HH:mm',
            startTime: new Date(),
            dynamic: true,
            dropdown: true,
            scrollbar: true,
            interval: 5,
            zindex: 1000
          });
          $('#timepicker2').timepicker({
            showInputs: false,
            timeFormat: 'HH:mm',
            startTime: new Date(),
            dynamic: true,
            dropdown: true,
            scrollbar: true,
            interval: 5,
            zindex: 1000
          });        
    }

    saveChanges(){
        if (this.checkTime()) {
            if (this.checkPassword()) {
               
                this.professorService.saveProfessor(this.idProfessor, this.email,this.password,this.ime, this.prezime, this.officeHoursList).subscribe();
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
        return true;
        //return this.password == this.password2 && this.password.length >= 6;
    }

    isMessageSet ():boolean {
        return this.message != "";
    }

    addOfficeHour(){
        let pocetak = $("#timepicker1").val();
        $("#timepicker1").val("");
        this.datumPocetak = new Date(this.datumPocetak);
        this.datumPocetak.setHours(parseInt(pocetak.split(":")[0]));
        this.datumPocetak.setMinutes(parseInt(pocetak.split(":")[1]))
        let kraj = $("#timepicker2").val();
        $("#timepicker2").val("");
        this.datumKraj = new Date(this.datumKraj);
        this.datumKraj.setHours(parseInt(kraj.split(":")[0]));
        this.datumKraj.setMinutes(parseInt(kraj.split(":")[1]))
        let json = {"beginTime": this.datumPocetak, "endTime" : this.datumKraj};
        this.officeHoursList.push(json);
        console.log(JSON.stringify(this.officeHoursList))
    }

    deleteOfficeHour(){
        let begin = this.officeHour.split(";")[0];
        let end = this.officeHour.split(";")[1];
       this.officeHoursList = this.officeHoursList.filter( x => x.endTime != end && x.beginTime != begin)
     }
    
    checkNewDate():boolean{
        let date1 = $("#datepicker1").val();
        let time1 = $("#timepicker1").val();
        let date2 = $("#datepicker2").val();
        let time2 = $("#timepicker2").val();
        if(date1 != "" && date2 != "" && time1 != "" && time2 != "") return false;
        return true;
    }

}
