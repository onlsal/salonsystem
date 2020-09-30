import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import * as Query from '../queries';
import moment from 'moment';
import { OwnerService } from '../srvs/owner.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

declare let Email: any;
declare const gapi: any;

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.sass']
})
export class RegistComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor( private apollo: Apollo,
    private frmBlder: FormBuilder,
    private router: Router,
    public ownsrv: OwnerService ) { }

  ngOnInit(): void {
    
    gapi.load('client', () => {
      gapi.client.init({
       apiKey: 'AIzaSyAn8eZ9hxycka9JElG_qwcxfg6-FS2JoQc',
       discoveryDocs: [
        'https://script.googleapis.com/$discovery/rest?version=v1',
      ], 
       clientId: '913080910103-0s805k1mjsgohs8begmklvrer1lu05ve.apps.googleusercontent.com',
       scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/forms https://www.googleapis.com/auth/spreadsheets'
     })

    });
    this.firstFormGroup = this.frmBlder.group({
      nam: ['', Validators.required],
      sei: ['', Validators.required],
      mei: ['', Validators.required],
      bir: ['', Validators.required],
      tel: ['', Validators.required]
    });
    this.secondFormGroup = this.frmBlder.group({
      zip: ['', Validators.required],
      reg: ['', Validators.required],
      loc: ['', Validators.required],
      str: ['', Validators.required],
      ext: ['','']
    }); 
    this.thirdFormGroup = this.frmBlder.group({
      calender: [''],
      // フォームを追加したり、削除したりするために、FormArrayを設定しています。
      options: this.frmBlder.array([])
    });
    this.addOptionForm();
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

  get calenders(): string[] {
    let cals:string[]=[];
    for (let i=0;i<this.options.length;i++){
      cals.push(this.options.value[i].calender);
    }
    return cals;
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
  
    var op = gapi.client.request({
      'root': 'https://script.googleapis.com',
      'path': 'v1/scripts/1d_MYVtwUgRlJv-rulQOPVNFHaSCYfzOSF5zVJUnfoGjoYA5stF5vRwrx:run',
      'method': 'POST',
      'body': {
                  'function': 'regist',
                  'parameters':[ this.ownsrv.owner.mail,
                                 this.ownsrv.owner.dojoname,
                                 this.calenders
                                ] 
              }
    });
    op.execute(function(resp) {
      if (resp.error && resp.error.status) {
        console.log(resp.error,resp.error.status);
      } else if (resp.error) {
        console.log(resp.error,resp.error.status);
      } else { 
        this.ownsrv.owner.folderid = resp.response.result.folder;
        console.log(resp.response.result);
      }
    });
     
    this.apollo.mutate<any>({
      mutation: Query.InsertOwner,
      variables: {
        "object": {
          "googleid": this.ownsrv.owner.googleid,
          "dojoname" : this.ownsrv.owner.dojoname,
          "sei" :   this.ownsrv.owner.sei,
          "mei" :   this.ownsrv.owner.mei,
          "birth" : moment(this.ownsrv.owner.birth).format("YYYY-MM-DD"),
          "mail" :  this.ownsrv.owner.mail,
          "zip" : this.ownsrv.owner.zip,
          "region" : this.ownsrv.owner.region,
          "local" : this.ownsrv.owner.local,
          "street" : this.ownsrv.owner.street,
          "extend" : this.ownsrv.owner.extend,
          "url" :   this.ownsrv.owner.url,
          "tel" :   this.ownsrv.owner.tel,
          "folderid" :   this.ownsrv.owner.folderid
       }
    },
  }).subscribe(({ data }) => {
    this.ownsrv.owner.dojoid = data.insert_tblowner_one.dojoid;
    // console.log('InsertMember', data);
  },(error) => {
    console.log('error InsertMember', error);
  });

  Email.send({
    SecureToken : '9853fbc2-4291-42b0-a969-e2c2015d1527',
    From : 'info@online-salons.net',
    To : this.ownsrv.owner.mail,
    Body : 'テスト本文',
    Subject : 'テスト件名',
    // Host : 'smtp.kagoya.net',
    // Username : 'tkdtokyo.os-info',
    // Password : 'kL7gUEpakkT'
    }).then( 
      message => console.log(message)
     );

  this.router.navigate(['/admin']);
  }

}
