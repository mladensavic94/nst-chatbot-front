import { Component, OnInit } from '@angular/core';
import {RequestOptions, Headers, Response, Http} from "@angular/http";

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public tableData: TableData;
    public arrayData: string[][] = new Array<string[]>();
    constructor(private http: Http) {
    }

  ngOnInit() {
      this.getAppointments().subscribe(
          resBody => {
            for(let i = 0; i < resBody.length; i++){
                this.arrayData.push([resBody[i].id, resBody[i].name, resBody[i].officeHours.beginTime, resBody[i].length, resBody[i].status]);
            }
          },
          error => console.log(error)
      );
      this.tableData = {
          headerRow: [ 'ID', 'Ime i prezime', 'Datum', 'Trajanje', 'Status', 'Akcija'],
          dataRows: this.arrayData
      };
  }

    getAppointments() {
        let emailQ = atob(sessionStorage.getItem("email"));
        let url = 'https://nst-chatbot.herokuapp.com/rest/appointments?email=' + emailQ;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map((res: Response) => res.json());
    }

}
