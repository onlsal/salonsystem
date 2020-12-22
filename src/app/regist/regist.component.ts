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
      this.ins_tblowner(flg,dojoid);
    });

  }

  private ins_tblowner(flg:boolean,dojoid:number):void {
    this.apollo.mutate<any>({
      mutation: Query.InsertOwner,
      variables: {
        "object": {
          "dojoid": dojoid,
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
          "tel" :   this.firstFormGroup.value.tel,
          "plan" :  flg
        }
      },
    }).subscribe(({ data }) => {
      this.ownsrv.owner.dojoid = data.insert_tblowner_one.dojoid;
      let cals:string = this.options.value[0].calender;
      for (let i=1;i<this.options.length;i++){
        cals += "＿" + this.options.value[i].calender;
      }
      Email.send({
        SecureToken : '9853fbc2-4291-42b0-a969-e2c2015d1527',
        From : 'info@online-salons.net',
        To : 'onlinesalon7@gmail.com',
        Body : 'regist｜' + this.firstFormGroup.value.nam + '｜' + dojoid + '｜' + this.ownsrv.owner.mail + '｜' + cals + '｜',
        Subject : 'registOnlineSalon',
      }).then( 
        message => console.log(message)
      ); 
      let dialog = this.dialog.open(DialogComponent ,{
                        'data' : {'mail' : this.ownsrv.owner.mail},
                        'height' : '300px',
                        'width' : '500px',
                        'disableClose' : false
                        });
      console.log(this.dojoid);                 
      // this.router.navigate(['/home']);
    },(error) => {
      console.log('error Insertownertbl', error);
    });
  }

  private get_dojoid():Subject<number> {
    let lc_dojoid;
    this.apollo.watchQuery<any>({
      query: Query.GetQuery2
      })
      .valueChanges
      .subscribe(({ data }) => {
        if (data.tblowner_aggregate.length==0){
          lc_dojoid = 1;
          this.dojoid.next(lc_dojoid);
        } else { 
          lc_dojoid = data.tblowner_aggregate.aggregate.max.dojoid + 1;
          this.dojoid.next(lc_dojoid);
        }
      });
    return this.dojoid;  
  }
}
