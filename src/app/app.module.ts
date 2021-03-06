import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';

import {AppComponent} from './app.component';

import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {TablesComponent} from './tables/tables.component';
import {AuthGuardService} from "./auth/auth-guard.service";
import {JwtHelper} from "angular2-jwt";
import {AuthService} from "./auth/auth.service";
import {Tab} from './home/tab.component';
import {Tabs} from './home/tabs.component';
import {ProfessorService} from './services/professorService';
import { AppointmentsService } from './services/appointmentsService';
import * as $ from 'jquery';
import { LOCALE_ID } from '@angular/core';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserComponent,
        TablesComponent,
        Tabs,
        Tab
        
        
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        RouterModule,
        AppRoutingModule
        
    ],
    providers: [
        AuthGuardService,
        AuthService,
        ProfessorService,
        AppointmentsService,
        JwtHelper,
        {provide: LOCALE_ID, useValue: 'en-US' }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
