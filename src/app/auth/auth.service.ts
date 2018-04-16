import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService {
    constructor() {
    }


    public isAuthenticated(): boolean {
        return true;
        //let email = localStorage.getItem("email");
        //return email != null;
    }
}
