import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Cal {
  dojoid:number;
  calid:string;
  name:string;
  url:string;
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
  sprid:string;
  constructor(init?:Partial<Cal>) {
      Object.assign(this, init);
  }
}

export class Fpat {
  dojoid:number;
  pattern:number;
  name:string;
  memo:string;
  url:string;
  constructor(init?:Partial<Fpat>) {
      Object.assign(this, init);
      delete this['__typename'];
  }
}

export class Result {
  dojoid:number;
  mail:string;
  memid:number;
  eda:number;
  sei:string;
  mei:string;
  birth:Date;
  class:string;
  del:string;
  tstmp:string;
  constructor(init?:Partial<Result>) {
      Object.assign(this, init);
  }
}

export class Mail {
  dojoid:number;
  subject:string;
  body:string;
  sendto:string;
  from:string;
  fromnm:string;
  formnm:string;
  created_at:Date;
  constructor(init?:Partial<Mail>) {
      Object.assign(this, init);
      delete this['__typename'];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public cals:Cal[] =[];
  public forms:Form[] =[];
  public fpats:Fpat[] =[];
  public rslts:Result[] =[];
  public mail:Mail = new Mail();
  public mails:Mail[] =[];
  public link0:string;
  public link1:string;
  public sprid:string;
  public wshid:string;

  //コンポーネント間通信用
  public subject = new Subject<string>();
  public observe = this.subject.asObservable();

  constructor() { }
  clear():void{
    this.cals=[];
    this.forms=[];
  }
}
