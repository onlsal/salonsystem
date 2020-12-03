import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService,Mail } from '../srvs/admin.service';

@Component({
  selector: 'app-tblmail',
  templateUrl: './tblmail.component.html',
  styleUrls: ['./tbl.component.scss']
})
export class TblmailComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns = ['created_at','formnm','subject','body','from','fromnm'];
  dataSource:MatTableDataSource<Mail>;

  constructor(public admsrv:AdminService) {
    this.dataSource = new MatTableDataSource<Mail>(this.admsrv.mails);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.admsrv.observe.subscribe(() => this.refresh());
  }

  refresh(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<Mail>(this.admsrv.mails);
  }
}
