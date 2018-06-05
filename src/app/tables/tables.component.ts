import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointmentsService';


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
    constructor(private appointmentsService: AppointmentsService) {
    }

  ngOnInit() {
      this.appointmentsService.getAppointments(atob(sessionStorage.getItem("email"))).subscribe(
          resBody => {
            for(let i = 0; i < resBody.length; i++){
                 this.arrayData.push([resBody[i].id, resBody[i].name, resBody[i].dateAndTime, resBody[i].studentID, resBody[i].description, resBody[i].status]);
            }
          },
          error => console.log(error)
      );
      this.tableData = {
          headerRow: [ 'ID', 'Ime i prezime', 'Datum', 'Facebook ID','Opis', 'Status','Trajanje','Akcija'],
          dataRows: this.arrayData
      };
  }

  sendResponseToStudent(id: string, state: string){
    this.appointmentsService.changeState(id, state).subscribe();
            for(let i = 0; i < this.arrayData.length; i++){
                if(this.arrayData[i][0] === id){
                    this.arrayData[i][5] = state;
                }
           }
        
  }

  btnEnabled(id: string): boolean{
    for(let i = 0; i < this.arrayData.length; i++){
        if(this.arrayData[i][0] === id && (this.arrayData[i][5] === "ACCEPTED" || this.arrayData[i][5] === "DENIED")){
            return true;
        }
   }
   return false;
}
   inputEnabled(id: string): boolean{
    for(let i = 0; i < this.arrayData.length; i++){
        if(this.arrayData[i][0] === id && this.arrayData[i][4] != undefined){
            return false;
        }
   }
   return true;
        
  }
  getLengthValue(id: string): string{
    for(let i = 0; i < this.arrayData.length; i++){
        if(this.arrayData[i][0] === id && this.arrayData[i][4] != undefined){
            return this.arrayData[i][4];
        }
   } 
   return "0"
  }

}
