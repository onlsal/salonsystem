import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleDriveProvider } from '../prvs/googledrive';
import { OwnerService } from '../srvs/owner.service';
import { AdminService, Form, Cal } from '../srvs/admin.service';
import { TblresComponent } from '../tbls/tblres.component';
import { Apollo } from 'apollo-angular';
import * as Query from '../queries';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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
  styleUrls: ['./admin.component.scss'],
  providers: [ GoogleDriveProvider ]
})

export class AdminComponent implements OnInit {
  @ViewChild(TblresComponent) tblres:TblresComponent;
  public frmgrp: FormGroup;
  public ids:Mst;
  public TabIndex:number=0;
  constructor(private apollo: Apollo,
              private frmBlder: FormBuilder,
              public gDrive: GoogleDriveProvider,
              public ownsrv: OwnerService,
              public admsrv: AdminService,
              private toastr: ToastrService  ) { }

  ngOnInit(): void {
    this.readGdrive();
    this.frmgrp = this.frmBlder.group({
      dojoname: ['', Validators.required],
      sei: ['', Validators.required],
      mei: ['', Validators.required],
      tel: ['', Validators.required],
      zip: ['', Validators.required],
      region: ['', Validators.required],
      local: ['', Validators.required],
      street: ['', Validators.required],
      extend: ['',''],
      url: ['','']
    });
    // console.log(this.ownsrv.owner);
    this.frmgrp.patchValue(this.ownsrv.owner);
  }

  readGdrive():void {
    let fileId = '1oyfyrhxl4vLGG2TGS1Yai9ltfyd3Mwg-YxFe3DRns-U';
    this.gDrive.load( fileId ,'od6')
    .then( ( data :any) => {
      // let idsdata:Mst[] = data;
      // console.log(this.ids,this.ownsrv.owner.dojoid);
      this.ids = data.find(e => e.dojoid == this.ownsrv.owner.dojoid);
      this.admsrv.link0="https://docs.google.com/forms/d/" + this.ids.form0 + "/viewform";
      this.admsrv.link1="https://docs.google.com/forms/d/" + this.ids.form0 + "/prefill";
      this.admsrv.sprid=this.ids.spread;
      this.gDrive.load( this.ids.spread , this.ids.wid)
      .then( ( data :any) => {
        for (let i=0;i<data.length;i++){
          let form:Form = new Form();
          form.tstmp = data[i]['タイムスタンプ'];
          form.title = data[i]['予約フォームタイトル'];
          form.type = data[i]['予約フォームタイプ'].split('＿')[0].slice( 1 );
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
          form.sprid = this.ids.spread;
          this.admsrv.forms.push(form);
        }
        this.admsrv.forms.sort(function(a, b) {
          if (a.date > b.date) {
            return -1;
          } else {
            return 1;
          } 
        });
        this.admsrv.subject.next();
      }, (error) => {
        console.log( error );
      });


    }, (error) => {
      console.log( error );
    });
    this.gDrive.load( fileId ,'oe1ilbc')
    .then( ( data :any) => {
      this.admsrv.cals=[];
      this.admsrv.link2='https://calendar.google.com/calendar/embed?';
      // this.admsrv.cals = data.filter(e => e.dojoid == this.ownsrv.owner.dojoid);
      for(let i=0;i<data.length;i++){
        if(data[i].dojoid == this.ownsrv.owner.dojoid) {
          let cal:Cal=new Cal();
          cal.dojoid = data[i].dojoid;
          cal.calid = data[i].calid;
          cal.name = data[i].name;
          cal.url = 'https://calendar.google.com/calendar/embed?src=' + cal.calid + '&ctz=Asia%2FTokyo';
          if(typeof data[i].del == 'undefined') {
            cal.del = '　';
          } else {
            cal.del = data[i].del;
          }
          this.admsrv.cals.push(cal);
          this.admsrv.link2 = this.admsrv.link2 + 'src=' + cal.calid + '&'
        } 
      }
      this.admsrv.link2 = this.admsrv.link2 + 'ctz=Asia%2FTokyo';
      // console.log(this.admsrv.cals);
      this.admsrv.cals.sort(function(a, b) {
        if (a.del > b.del) {
          return 1;
        } else {
          return -1;
        } 
      });
      // console.log(this.admsrv.cals);
    }, (error) => {
      console.log( error );
    });
  }
  refresh(){
    this.admsrv.clear();
    this.readGdrive();
  }
  goList(){
    this.TabIndex = 3;
    this.tblres.readJoin();
  }

  ins_maillog(){
    this.apollo.mutate<any>({
      mutation: Query.InsertMaillog,
      variables: {
        "object": {
          "dojoid" : this.ownsrv.owner.dojoid,
          "subject": this.admsrv.mail.subject,
          "body"   : this.admsrv.mail.body,
          "sendto" : this.admsrv.mail.sendto
        }
      },
    }).subscribe(({ data }) => {

    },(error) => {
      console.log('error Insertmailtbl', error);
    });
  }
　
  updOwner(){
    this.apollo.mutate<any>({
      mutation: Query.UpdateOwner,
      variables: {
        "_set": {
          "dojoname" : this.frmgrp.value.dojoname,
          "sei" :   this.frmgrp.value.sei,
          "mei" :   this.frmgrp.value.mei,
          "zip" : this.frmgrp.value.zip,
          "region" : this.frmgrp.value.region,
          "local" : this.frmgrp.value.local,
          "street" : this.frmgrp.value.street,
          "extend" : this.frmgrp.value.extend,
          "url" :   this.frmgrp.value.url,
          "tel" :   this.frmgrp.value.tel
        },
        "gid": this.ownsrv.owner.googleid
      },
    }).subscribe(({ data }) => {
      this.toastr.success('変更を保存しました');
    },(error) => {
      console.log('error Updateownertbl', error);
    });    
  }
  regPlan(){
    console.log(this.ownsrv.owner);
  }
  canPlan(){
    console.log(this.ownsrv.owner);
  }

}
