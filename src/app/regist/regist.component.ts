import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import * as Query from '../queries';
import { OwnerService } from '../srvs/owner.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

declare let Email: any;
declare const gapi: any;

class Calobj {
  dojoid:number;
  calname:string;
  calid:string;
  constructor(init?:Partial<Calobj>) {
      Object.assign(this, init);
  }
}

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.sass']
})
export class RegistComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup; 
  dojoid: Subject<number> = new Subject();

  constructor(private apollo: Apollo,
              private frmBlder: FormBuilder,
              private router: Router,
              public ownsrv: OwnerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    
    // gapi.load('client', () => {
    //   gapi.client.init({
    //    apiKey: 'AIzaSyAn8eZ9hxycka9JElG_qwcxfg6-FS2JoQc',
    //    discoveryDocs: [
    //     'https://script.googleapis.com/$discovery/rest?version=v1',
    //   ], 
    //    clientId: '913080910103-0s805k1mjsgohs8begmklvrer1lu05ve.apps.googleusercontent.com',
    //   //  scope: 'exit'
    //    scope: 'https://www.googleapis.com/auth/forms https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/script.scriptapp https://www.googleapis.com/auth/spreadsheets'
    //  })

    // });
    
    this.firstFormGroup = this.frmBlder.group({
      nam: ['', Validators.required],
      sei: ['', Validators.required],
      mei: ['', Validators.required],
      tel: ['', Validators.required]
    });
    this.secondFormGroup = this.frmBlder.group({
      zip: ['', Validators.required],
      reg: ['', Validators.required],
      loc: ['', Validators.required],
      str: ['', Validators.required],
      ext: ['',''],
      url: ['','']
    }); 
    this.thirdFormGroup = this.frmBlder.group({
      calender: [''],
      // フォームを追加したり、削除したりするために、FormArrayを設定しています。
      options: this.frmBlder.array([])
    });
    this.addOptionForm();

    this.firstFormGroup.patchValue(this.ownsrv.owner);

  }
  
  // 追加ボタンがおされたときに追加したいフォームを定義しています。returnでFormGroupを返しています。
  get optionForm(): FormGroup {
    return this.frmBlder.group({
      calender: ['']
    });
  }
  
  // FormのOption部分を取り出しています。
  // テンプレートでオプション部分を表示するときやフォームの追加・削除のときに利用します。
  // 型をFormArrayとすることがポイントです
  get options(): FormArray {
    return this.thirdFormGroup.get('options') as FormArray;
  }

  // 追加ボタンがクリックされたときに実行する関数です。
  // pushとすることで既存のフォームにオプション用のフォームを追加します。
  addOptionForm() {
    this.options.push(this.optionForm);
  }
  
  // removeAtでインデックスを指定することで、FormArrayのフォームを削除します。
  removeOptionForm(idx: number) {
    this.options.removeAt(idx);
  }
  
  public ins_owner(flg:boolean):void {
    this.get_dojoid().subscribe(dojoid => {
      this.ownsrv.owner.dojoid=dojoid;
      this.regist_owner(flg,dojoid);
    });
  }

  private regist_owner(flg:boolean,dojoid:number):void {  
    let cals:string = this.options.value[0].calender;
    for (let i=1;i<this.options.length;i++){
      // this.cals.push(this.options.value[i].calender);
      cals += "＿" + this.options.value[i].calender;
    }
    console.log(this.ownsrv.owner,cals);
    // var op = gapi.client.request({
    //   'root': 'https://script.googleapis.com',
    //   'path': 'v1/scripts/1Q5gqppTVHnenU2m2MWbM83nXpKr7P0OQXwEjzfRRx-zp776Zi9V9wYhn:run',
    //   'method': 'POST',
    //   'body': {
    //               'function': 'registOwner',
    //               'parameters':[ this.firstFormGroup.value.nam,
    //                             this.cals,
    //                             dojoid ]
    //               // 'path': 'v1/scripts/1d_MYVtwUgRlJv-rulQOPVNFHaSCYfzOSF5zVJUnfoGjoYA5stF5vRwrx:run',
    //           }

    // });
    // let self=this;
    // op.execute(function(resp) {
    //   if (resp.error && resp.error.status) {
    //     console.log(resp.error,resp.error.status);
    //   } else if (resp.error) {
    //     console.log(resp.error,resp.error.status);
    //   } else { 
    //     // this.ownsrv.owner.folderid = resp.response.result.folder;
    //     // console.log("suc",resp.response.result);
    //     self.ins_tblowner(resp.response.result);
    //     self.router.navigate(['/admin']);
    //   }
    // });
    Email.send({
      SecureToken : '9853fbc2-4291-42b0-a969-e2c2015d1527',
      From : 'info@online-salons.net',
      To : 'onlinesalon7@gmail.com',
      Body : 'regist｜' + this.firstFormGroup.value.nam + '｜' + dojoid + '｜' + this.ownsrv.owner.mail + '｜' + cals + '｜',
      Subject : 'registOnlineSalon',
      // Host : 'smtp.kagoya.net',
      // Username : 'tkdtokyo.os-info',
      // Password : 'kL7gUEpakkT'
      }).then( 
        message => console.log(message)
      );
    this.ins_tblowner(); 
  }
  private ins_tblowner():void {
    this.apollo.mutate<any>({
      mutation: Query.InsertOwner,
      variables: {
        "object": {
          "dojoid": this.ownsrv.owner.dojoid,
          "googleid": this.ownsrv.owner.googleid,
          "dojoname" : this.firstFormGroup.value.nam,
          "sei" :   this.firstFormGroup.value.sei,
          "mei" :   this.firstFormGroup.value.mei,
          "mail" :  this.ownsrv.owner.mail,
          "zip" : this.secondFormGroup.value.zip,
          "region" : this.secondFormGroup.value.reg,
          "local" : this.secondFormGroup.value.loc,
          "street" : this.secondFormGroup.value.str,
          "extend" : this.secondFormGroup.value.ext,
          "url" :   this.secondFormGroup.value.url,
          "tel" :   this.firstFormGroup.value.tel
          // "folderid" : result.folder,
          // "sprshtid" : result.sprsht
        }
      },
    }).subscribe(({ data }) => {
      this.ownsrv.owner.dojoid = data.insert_tblowner_one.dojoid;
      // console.log('InsertMember', data);
      // let forms:[{
      //   formid:string;
      //   formname:string;
      //   dojoid:number;
      //   formtype:number;
      // }]=[{
      //   "formid"   : result.forms[0],
      //   "formname" : '予約作成画面',
      //   "dojoid"   : this.ownsrv.owner.dojoid,
      //   "formtype" : 0
      // }];
      // forms.push({
      //   "formid"   : result.forms[1],
      //   "formname" : 'テンプレート１(イベント決済あり)',
      //   "dojoid"   : this.ownsrv.owner.dojoid,
      //   "formtype" : 1
      // });
      // forms.push({
      //   "formid"   : result.forms[2],
      //   "formname" : 'テンプレート２(イベント決済なし)',
      //   "dojoid"   : this.ownsrv.owner.dojoid,
      //   "formtype" : 2
      // }); 
      // this.ins_tblform(forms);
      // let calobj:Calobj[]=[];
      // for (let i=0;i<result.cals.length;i++){
      //   calobj.push({
      //     "dojoid"  : this.ownsrv.owner.dojoid,
      //     "calname" : this.cals[i],
      //     "calid"   : result.cals[i],
      //   });
      // }
      // this.ins_tblcal(calobj);
      let dialog = this.dialog.open(DialogComponent ,{
                        'data' : {'mail' : this.ownsrv.owner.mail},
                        'height' : '300px',
                        'width' : '500px',
                        'disableClose' : false
                        });
      this.router.navigate(['/admin']);
    },(error) => {
      console.log('error Insertownertbl', error);
    });
  }

  // private ins_tblform(objects:any):void {
  //   this.apollo.mutate<any>({
  //     mutation: Query.InsertForm,
  //     variables: {
  //       "objects": objects
  //     },
  //   }).subscribe(({ data }) => {
  //     console.log('ins_tblform', data);
  //   },(error) => {
  //     console.log('error Iins_tblform', error);
  //   });
  // }

  // private ins_tblcal(objects:any):void {
  //   this.apollo.mutate<any>({
  //     mutation: Query.InsertCalender,
  //     variables: {
  //       "objects": objects
  //     },
  //   }).subscribe(({ data }) => {
  //     console.log('ins_tblcal', data);
  //   },(error) => {
  //     console.log('error Iins_tblcal', error);
  //   });
  // }

  private get_dojoid():Subject<number> {
    let lc_dojoid;
    this.apollo.watchQuery<any>({
      query: Query.GetQuery2
      })
      .valueChanges
      .subscribe(({ data }) => {
        if (data.tblowner_aggregate.length==0){
          lc_dojoid = 1;
          // console.log(data.tblowner_aggregate,lc_dojoid);
          this.dojoid.next(lc_dojoid);
        } else { 
          lc_dojoid = data.tblowner_aggregate.aggregate.max.dojoid + 1;
          // console.log(data.tblowner_aggregate.aggregate.max.dojoid,lc_dojoid);
          this.dojoid.next(lc_dojoid);
        }
      });
    return this.dojoid;  
  }
}
