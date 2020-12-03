import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GoogleDriveProvider } from '../prvs/googledrive';
import { OwnerService } from '../srvs/owner.service';
import { AdminService, Result } from '../srvs/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { SendmailComponent } from '../dialog/sendmail.component';
import { Apollo } from 'apollo-angular';
import * as Query from '../queries';

declare let Email: any;

@Component({
  selector: 'app-tblres',
  templateUrl: './tblres.component.html',
  styleUrls: ['./tbl.component.scss'],
  providers: [ GoogleDriveProvider ]
})
export class TblresComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource:MatTableDataSource<Result>;
  displayedColumns = ['mail','memid','eda','sei','mei','birth','class'];
  constructor(public gDrive: GoogleDriveProvider,
              public admsrv: AdminService,
              public ownsrv: OwnerService,
              public dialog: MatDialog,
              private apollo: Apollo) { 
    this.dataSource = new MatTableDataSource<Result>(this.admsrv.rslts);            
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.admsrv.observe.subscribe(() => this.refresh());
  }

  readJoin():void {
    this.admsrv.rslts=[];
    this.gDrive.load( this.admsrv.sprid ,this.admsrv.wshid)
    .then( ( data :any) => {
      for (let i=0;i<data.length;i++){
        let rslt:Result = new Result();
        rslt.tstmp = data[i]['タイムスタンプ'];
        rslt.mail = data[i]['メールアドレス'];
        rslt.memid = data[i]['会員番号'];
        rslt.eda = data[i]['会員枝番'];
        rslt.sei = data[i]['参加者姓'];
        rslt.mei = data[i]['参加者名'];
        rslt.birth = data[i]['生年月日'];
        rslt.class = data[i]['クラス'];
        this.admsrv.rslts.push(rslt);
      }
      this.admsrv.subject.next();
    }, (error) => {
      console.log( error );
    });
  }
  changeFrm(wid:string):void {
    // console.log(wid);
    this.admsrv.wshid=wid;
    this.readJoin();
  }
  refresh(): void {
    this.dataSource = new MatTableDataSource<Result>(this.admsrv.rslts);
    this.dataSource.paginator = this.paginator;
    // console.log(this.admsrv.forms);
  }
  sendMail(): void {

    this.admsrv.mail.dojoid  = this.ownsrv.owner.dojoid;
    this.admsrv.mail.fromnm  = this.ownsrv.owner.dojoname;
    this.admsrv.mail.from    = this.ownsrv.owner.mail;
    let i:number = this.admsrv.forms.findIndex(e => e.wid = this.admsrv.wshid);
    this.admsrv.mail.formnm  = this.admsrv.forms[i].date + this.admsrv.forms[i].title;
    
    let maildia = this.dialog.open(SendmailComponent ,{
      'height' : '500px',
      'width' : '800px'
      // 'disableClose' : false
    });
    maildia.afterClosed().subscribe(result => {
      let sendto:string="";
      let body:string="";
      if(result) {
        let tmpbody:string[] =  this.admsrv.mail.body.split('\n');
        for(let i=0;i<tmpbody.length;i++){
          body = body + tmpbody[i] + '<br>'; 
        }
        for(let i=0;i<this.admsrv.rslts.length;i++){
          console.log(body,this.admsrv.mail.body);
          Email.send({
            SecureToken : '9853fbc2-4291-42b0-a969-e2c2015d1527',
            From : 'info@online-salons.net',
            FromName: this.admsrv.mail.fromnm ,
            ReplyAddress: this.admsrv.mail.from ,
            To : this.admsrv.rslts[i].mail,
            Body : body,
            Subject : this.admsrv.mail.subject,
          }).then( 
            message => console.log(message)
          );
          sendto = sendto + ',' + this.admsrv.rslts[i].mail;    
        }
        this.admsrv.mail.sendto = sendto.slice(1);
        this.apollo.mutate<any>({
          mutation: Query.InsertMaillog,
          variables: {
            "object": this.admsrv.mail
          },
        }).subscribe(({ data }) => {
          console.log(data);
        },(error) => {
          console.log('error InsertMail', error);
        });
      }
    });
  }
}
