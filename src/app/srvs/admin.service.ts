import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Cal {
  dojoid:number;
  calid:string;
  name:string;
  del:string;
  constructor(init?:Partial<Cal>) {
      Object.assign(this, init);
  }
}

export class Form {
  tstmp:string;
  title:string;
  type:string;
  cal:string;
  desc:string;
  date:string;
  stim:string;
  etim:string;
  capa:number;
  money:number;
  formid:string;
  calid:string;
  eventid:string;
  sheetid:string;
  wid:string;
  del:string;
  constructor(init?:Partial<Cal>) {
      Object.assign(this, init);
  }
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public cals:Cal[] =[];
  public forms:Form[] =[];

  //コンポーネント間通信用
  public subject = new Subject<string>();
  public observe = this.subject.asObservable();

  constructor() { }
}
