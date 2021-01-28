import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService,Form } from '../srvs/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialog/confirm.component';

declare let Email: any;

@Component({
  selector: 'app-tblform',
  templateUrl: './tblform.component.html',
  styleUrls: ['./tbl.component.scss']
})
export class TblformComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() action = new EventEmitter();
  @Output() action2 = new EventEmitter();
  // chDel:boolean = false;
  // filterValues: any = {};
  dataSource:MatTableDataSource<Form>;
  displayedColumns = ['title','type','cal','desc','date','stim','etim','capa','money','del','tstmp','act1','act2'];

  constructor(public admsrv:AdminService,
              public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<Form>(this.admsrv.forms);            
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.admsrv.observe.subscribe(() => this.refresh());
  }

  setBgcolor(del: string): string {
    let color:string;
    if ( del === '削除済' ){
      color = 'lightgray';
    }
    return color;
  } 

  deleteRow(i:number) {
    // console.log(this.admsrv.forms[i]);
    let confdia = this.dialog.open(ConfirmComponent ,{
      'height' : '300px',
      'width' : '500px'
      // 'disableClose' : false
    });
    confdia.afterClosed().subscribe(result => {
      if(result) {
        // console.log(this.admsrv.forms[i].formid,this.admsrv.forms[i]);
        Email.send({
          SecureToken : '9853fbc2-4291-42b0-a969-e2c2015d1527',
          From : 'info@online-salons.net',
          To : 'onlinesalon7@gmail.com',
          Body : 'delform｜' + this.admsrv.forms[i].formid + '｜' + this.admsrv.forms[i].calid + '｜' + this.admsrv.forms[i].eventid  + '｜' + this.admsrv.forms[i].sprid + '｜',
          Subject : 'registOnlineSalon',
        }).then( 
          message => console.log(message)
        );
        this.admsrv.forms[i].del='削除済';
        this.refresh();
      }
    });
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource<Form>(this.admsrv.forms);
    this.dataSource.paginator = this.paginator;
    // console.log(this.admsrv.forms);
  }
  reRead(){
    this.admsrv.clear();
    this.action.emit();
    this.refresh();
  }

  goList(wid:string){
    this.admsrv.wshid = wid;
    this.action2.emit();
  }

}
