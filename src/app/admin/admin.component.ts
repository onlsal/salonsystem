import { Component, OnInit } from '@angular/core';
import { GoogleDriveProvider } from '../prvs/googledrive';
import { OwnerService } from '../srvs/owner.service';
import { AdminService, Form } from '../srvs/admin.service';

class Mst {
  dojoid:number;
  folder:string;
  spread:string;
  form0:string;
  form1:string;
  form2:string;
  wid:string;
  constructor(init?:Partial<Mst>) {
      Object.assign(this, init);
  }
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  providers: [ GoogleDriveProvider ]
})


export class AdminComponent implements OnInit {

  public ids:Mst;
  public link1:string;
  constructor(public gDrive: GoogleDriveProvider,
              public ownsrv: OwnerService,
              public admsrv: AdminService  ) { }

  ngOnInit(): void {
    this.readGdrive();

    
  }


  readGdrive():void {

    let fileId = '/1oyfyrhxl4vLGG2TGS1Yai9ltfyd3Mwg-YxFe3DRns-U';
    this.gDrive.load( fileId ,'/od6')
    .then( ( data :any) => {
      // let idsdata:Mst[] = data;
      // console.log(this.ids,this.ownsrv.owner.dojoid);
      this.ids = data.find(e => e.dojoid == this.ownsrv.owner.dojoid);
      this.link1="https://docs.google.com/forms/d/" + this.ids.form0 + "/viewform";
      this.gDrive.load( '/' + this.ids.spread , '/' + this.ids.wid)
      .then( ( data :any) => {
        
        let form:Form = new Form();
        for (let i=0;i<data.length;i++){
          let form:Form = new Form();
          form.tstmp = data[i]['タイムスタンプ'];
          form.title = data[i]['予約フォームタイトル'];
          form.type = data[i]['予約フォームパターン'].split('＿')[0];
          form.cal = data[i]['登録先カレンダー'].split('＿')[0];
          form.desc = data[i]['概要説明'];
          form.date = data[i]['開催日'];
          form.stim = data[i]['開始時間24時間表示で入力'];
          form.etim = data[i]['終了時間24時間表示で入力'];
          form.capa = +data[i]['定員数字のみ入力'];
          form.money = +data[i]['金額'];
          form.formid = data[i].formid;
          form.calid = data[i].calid;
          form.eventid = data[i].eventid;
          form.sheetid = data[i].sheetid;
          form.wid = data[i].wid;
          form.del = data[i].del;
          this.admsrv.forms.push(form);
        }
        this.admsrv.subject.next();
      }, (error) => {
        console.log( error );
      });


    }, (error) => {
      console.log( error );
    });
    this.gDrive.load( fileId ,'/oe1ilbc')
    .then( ( data :any) => {
      // let calsdata:Cal[] = data;
      this.admsrv.cals = data.filter(e => e.dojoid == this.ownsrv.owner.dojoid);
    }, (error) => {
      console.log( error );
    });
  }
}
