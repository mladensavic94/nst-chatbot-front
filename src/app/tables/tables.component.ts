import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentsService } from '../services/appointmentsService';
import { Router } from '@angular/router';
import { ProfessorService } from '../services/professorService';
import { DatePipe } from '@angular/common';
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
    public officeHour: any;
    public officeHourList: any[];
    constructor(private appointmentsService: AppointmentsService, private router: Router, private professorService: ProfessorService, private cdr: ChangeDetectorRef) {
    }

  ngOnInit() {
      this.appointmentsService.getAppointments(atob(sessionStorage.getItem("email"))).subscribe(
          resBody => {
            for(let i = 0; i < resBody.length; i++){
                this.arrayData.push([resBody[i].id, resBody[i].name, resBody[i].dateAndTime, resBody[i].studentID, resBody[i].status]);
                this.lengthData.push([resBody[i].id, resBody[i].length, resBody[i].description]);
                }
          },
          error => console.log(error)
      );
      this.tableData = {
          headerRow: [ 'ID', 'Ime i prezime', 'Datum', 'Facebook ID', 'Status','Opis','Trajanje','Akcija'],
          dataRows: this.arrayData
      };
      this.professorService.getProfessor(atob(sessionStorage.getItem("email"))).subscribe(
        resBody => {
                this.officeHourList = resBody.listOfOfficeHours;
                this.officeHourList = this.officeHourList.sort(function(a, b) {
                    if (a.id < b.id) return -1;
                    else if (a.id > b.id) return 1;
                    else return 0;
                }) 
          },
          error => console.log(error)
      );
  }

  sendResponseToStudent(id: string, state: string){
    let idLen = "input"+id;
    let length = $("."+idLen).val();
    this.appointmentsService.changeState(id, state, parseInt(length)).subscribe(
        resBody =>{
            for(let i = 0; i < this.arrayData.length; i++){
                if(this.arrayData[i][0] === id){
                    let date =  new Date(parseInt((JSON.stringify(resBody))));
                    date.setHours(date.getHours()-2)
                    this.arrayData[i][4] = state
                    var datePipe = new DatePipe("en-US");
                    this.arrayData[i][2] = datePipe.transform(date, "MMM dd, yyyy hh:mm:ss a")
     
                }
            }},
            error => console.error(error)
                    
    );
        
    
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
        if(this.lengthData[i][0] === id && this.lengthData[i][1] == undefined && this.arrayData[i][4] == 'FULL'){
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
  getDescValue(id: string):string{
    for(let i = 0; i < this.lengthData.length; i++){
        if(this.lengthData[i][0] === id && this.lengthData[i][2] != undefined){
            if(this.lengthData[i][2].length > 200){
                return this.lengthData[i][2].substring(0,200) + "...";
            }else return this.lengthData[i][2];
        }
   } 
   return "Undefined"
  }
  getDescStatus(id: string):boolean{
    for(let i = 0; i < this.lengthData.length; i++){
        if(this.lengthData[i][0] === id && this.lengthData[i][2] != undefined){
            if(this.lengthData[i][2].includes("http")){
                return true;
            }
        }
   } 
   return false;
  }
  filterOfficeHours(){
      this.professorService.getOfficeHours(atob(sessionStorage.getItem('email')), this.officeHour).subscribe(
        resBody => {
             this.arrayData = new Array<string[]>();
             this.lengthData = new Array<string[]>();
             for(let i = 0; i < resBody.length; i++){
                this.arrayData.push([resBody[i].id, resBody[i].name, resBody[i].dateAndTime, resBody[i].studentID, resBody[i].status]);
                this.lengthData.push([resBody[i].id, resBody[i].length, resBody[i].description]);
            }
            this.tableData.dataRows = this.arrayData;
            this.cdr.detectChanges();
          },
          error => console.log(error)
    );

  }
}
