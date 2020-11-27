import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService,Form } from '../srvs/admin.service';

@Component({
  selector: 'app-tblform',
  templateUrl: './tblform.component.html',
  styleUrls: ['./tbl.component.scss']
})
export class TblformComponent implements OnInit {

  displayedColumns = ['title','type','cal','desc','date','stim','etim','capa','money','tstmp','act1'];
  dataSource = new MatTableDataSource<Form>(this.admsrv.forms);

  constructor(public admsrv:AdminService) { }

  ngOnInit(): void {
    this.admsrv.observe.subscribe(() => this.refresh());
  }

  deleteRow(i:number) {

  }
  refresh(){
    this.dataSource = new MatTableDataSource<Form>(this.admsrv.forms);
    console.log(this.admsrv.forms);
  }

}
