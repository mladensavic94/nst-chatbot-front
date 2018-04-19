import {Component, OnInit} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import { Tabs } from './tabs.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    email: string = "";
    password: string = "";
    password2: string = "";
    ime: string = "";
    prezime: string = "";
    message: string = "";

    constructor(private http: Http, private router: Router) {
    }

    ngOnInit() {

    }

    login() {
        this.getProfessor().subscribe(
            resBody =>{
                if( resBody != null){
                    sessionStorage.setItem("email", btoa(this.email));
                    sessionStorage.setItem("password", btoa(this.password));
                    this.router.navigate(['table']);
                    this.message = "";
                }else{
                    this.email = "";
                    this.password = "";
                    this.message = "Email or password is wrong";

                }
            },
            error => this.message = error,
        );
    }
    register(){
        if(this.email != ""){
            if(this.password != ""){
                if(this.ime != ""){
                    if(this.prezime != ""){
                        if(this.password == this.password2){
                        this.saveProfessor().subscribe(resBody => {
                            window.location.reload();
                        },
                        error => {
                            this.message = "Doslo je do greske prilikom registracije";
                        });
                        }else this.message = "Sifre se ne poklapaju!";
                    }else this.message = "Prezime ne sme biti prazno!";
                }else this.message = "Ime ne sme biti prazno!";
            }else this.message = "Sifra ne sme biti prazna!"
        }else this.message = "Email ne sme biti prazan!";
    }

    getProfessor() {
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor?email='+ this.email +'&password=' + this.password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res:Response) => res.json());
    }

    saveProfessor(){
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor/save';
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let json = "{\"email\":\"" + this.email + "\",\"password\":\"" + this.password + "\",\"firstName\":\"" + this.ime + "\",\"lastName\":\"" + this.prezime + "\"}";
        return this.http.post(url, json).map((res: Response) => {
            res.headers;
        });

    }

    isMessageSet ():boolean {
        return this.message != "";
    }
}

