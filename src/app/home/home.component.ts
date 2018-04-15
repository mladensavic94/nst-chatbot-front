import {Component, OnInit} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    email: string = "mladen@gmail.com";
    password: string = "msavic";
    message: string = "";

    constructor(private http: Http, private router: Router) {
    }

    ngOnInit() {

    }

    login() {
        this.getProfessor().subscribe(
            resBody =>{
                if( resBody != null){
                    localStorage.setItem("email", btoa(this.email));
                    localStorage.setItem("password", btoa(this.password));
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

    getProfessor() {
        let url = 'https://nst-chatbot.herokuapp.com/rest/professor?email='+ this.email +'&password=' + this.password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res:Response) => res.json());
    }

    isMessageSet ():boolean {
        return this.message != "";
    }
}

