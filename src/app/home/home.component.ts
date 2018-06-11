import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import { ProfessorService } from '../services/professorService';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    email: string = "";
    password: string = "";
    password2: string = "";
    ime: string = "";
    prezime: string = "";
    message: string = "";

    constructor(private router: Router, private professorService: ProfessorService) {
    }

    login() {
        this.professorService.login(this.email, this.password).subscribe((res) =>{
            var headers = res.headers;
            if(headers.get('Authorization') != null){
                sessionStorage.setItem("email", btoa(this.email));
                sessionStorage.setItem("token", btoa(headers.get('Authorization')));
                this.router.navigate(['table']);
                this.message = "";
            }else{
                this.email = "";
                this.password = "";
                this.message = "Email or password is wrong";

            }
           
        }, error => this.message = error
    );}

    register(){
        if(this.email != ""){
            if(this.password != ""){
                if(this.ime != ""){
                    if(this.prezime != ""){
                        if(this.password == this.password2){
                            this.professorService.register(this.email, this.password, this.ime, this.prezime, null).subscribe();
                        }else this.message = "Sifre se ne poklapaju!";
                    }else this.message = "Prezime ne sme biti prazno!";
                }else this.message = "Ime ne sme biti prazno!";
            }else this.message = "Sifra ne sme biti prazna!"
        }else this.message = "Email ne sme biti prazan!";
    }

   

    isMessageSet ():boolean {
        return this.message != "";
    }
}

