import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService,Cal } from '../srvs/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { OwnerService } from '../srvs/owner.service';
import { ConfirmComponent } from '../dialog/confirm.component';

declare let Email: any;

@Component({
  selector: 'app-tblcal',
  templateUrl: './tblcal.component.html',
  styleUrls: ['./tbl.component.scss']
})
export class TblcalComponent implements OnInit {
  @Output() action = new EventEmitter();
  dataSource:MatTableDataSource<Cal>;
  displayedColumns = ['name','url','qr','del','act1'];
  name:string="";
  alertmsg: string = 'カレンダー登録を受け付けました。反映されるまでしばらくお待ちください。';
  
  constructor(public admsrv:AdminService,
              public ownsrv:OwnerService,
              public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<Cal>(this.admsrv.cals);
  }

  ngOnInit(): void {
    this.admsrv.observe.subscribe(() => this.refresh());
  }

  insCal(): void {
 
    Email.send({
      SecureToken : '9853fbc2-4291-42b0-a969-e2c2015d1527',
      From : 'オンライン予約システム',
      To : 'onlinesalon7@gmail.com',
      Body : 'inscal｜' + this.name + '｜' + this.ownsrv.owner.dojoid + '｜' + this.ownsrv.owner.mail + '｜',
      Subject : 'registOnlineSalon',
    }).then( 
      message => console.log(message)
    );
    alert(this.alertmsg);
    this.name="";
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
    let dialog = this.dialog.open(ConfirmComponent ,{
      'height' : '300px',
      'width' : '500px'
      // 'disableClose' : false
    });
    dialog.afterClosed().subscribe(result => {
      if(result) {
        Email.send({
          SecureToken : '9853fbc2-4291-42b0-a969-e2c2015d1527',
          From : 'info@online-salons.net',
          To : 'onlinesalon7@gmail.com',
          Body : 'delcal｜' + this.admsrv.cals[i].calid + '｜',
          Subject : 'registOnlineSalon',
        }).then( 
          message => console.log(message)
        );
        this.admsrv.cals[i].del='削除済';
        this.refresh();
      }
    });
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource<Cal>(this.admsrv.cals);
    // console.log(this.admsrv.forms);
  }

  reRead(){
    this.admsrv.clear();
    this.action.emit();
    this.refresh();
  }  
}
