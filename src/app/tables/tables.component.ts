import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointmentsService';
import { Router } from '@angular/router';
declare var $: any;

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
    public lengthData: string[][] = new Array<string[]>();
    constructor(private appointmentsService: AppointmentsService, private router: Router) {
    }

  ngOnInit() {
      this.appointmentsService.getAppointments(atob(sessionStorage.getItem("email"))).subscribe(
          resBody => {
            for(let i = 0; i < resBody.length; i++){
                 this.arrayData.push([resBody[i].id, resBody[i].name, resBody[i].dateAndTime, resBody[i].studentID, resBody[i].status, resBody[i].description]);
                this.lengthData.push([resBody[i].id, resBody[i].length]);
                }
          },
          error => console.log(error)
      );
      this.tableData = {
          headerRow: [ 'ID', 'Ime i prezime', 'Datum', 'Facebook ID', 'Status','Opis','Trajanje','Akcija'],
          dataRows: this.arrayData
      };
  }

  sendResponseToStudent(id: string, state: string){
    let idLen = "input"+id;
    let length = $("."+idLen).val();
    this.appointmentsService.changeState(id, state, parseInt(length)).subscribe();
    this.router.navigateByUrl('/dashboard', {skipLocationChange: true}).then(()=>
    this.router.navigate(["table"]));
    /*        for(let i = 0; i < this.arrayData.length; i++){
                if(this.arrayData[i][0] === id){
                    this.arrayData[i][4] = state;
                }
           }*/
    
  }

  btnEnabled(id: string): boolean{
    for(let i = 0; i < this.arrayData.length; i++){
        if(this.arrayData[i][0] === id && (this.arrayData[i][4]== "ACCEPTED" || this.arrayData[i][4] === "DENIED")){
            return true;
        }
   }
   return false;
}
   inputEnabled(id: string): boolean{
    for(let i = 0; i < this.lengthData.length; i++){
        if(this.lengthData[i][0] === id && this.lengthData[i][1] == undefined){
            return false;
        }
   }
   return true;
        
  }
  getLengthValue(id: string): string{
    for(let i = 0; i < this.lengthData.length; i++){
        if(this.lengthData[i][0] === id && this.lengthData[i][1] != undefined){
            return this.lengthData[i][1];
        }
   } 
   return "0"
  }

}
