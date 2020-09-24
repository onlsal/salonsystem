import { Injectable } from '@angular/core';

export class Owner {
  dojoid:number;
  googleid:number;
  dojoname:string;
  sei:string;
  mei:string;
  birth:Date;
  mail:string;
  zip:string;
  region:string;
  local:string;
  street:string;
  extend:string;
  url:string;
  tel:string;
  folderid:string;
  constructor(init?:Partial<Owner>) {
      Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public owner:Owner = new Owner();
  constructor() { }
}
