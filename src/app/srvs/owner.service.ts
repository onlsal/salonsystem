import { Injectable } from '@angular/core';
import { AdminService, Fpat, Mail } from './admin.service';
import { Apollo } from 'apollo-angular';
import * as Query from '../queries';
// import { Subject } from 'rxjs';

export class Owner {
  dojoid:number;
  googleid:number;
  dojoname:string;
  sei:string;
  mei:string;
  mail:string;
  zip:string;
  region:string;
  local:string;
  street:string;
  extend:string;
  url:string;
  tel:string;
  folderid:string;
  plan:boolean;
  constructor(init?:Partial<Owner>) {
      Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  // public subject = new Subject<Owner>();
  // public observe = this.subject.asObservable();
  public owner:Owner = new Owner();
  public flgEx:boolean = false;
  constructor(private admsrv: AdminService,
              private apollo: Apollo) { }

  getOwner(claim:any):void {
    this.apollo.watchQuery<any>({
      query: Query.GetQuery1,
      variables: { 
          gid:claim.sub
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        if (data.tblowner.length==0){
          this.owner.googleid=claim.sub;
          this.owner.sei=claim.family_name;
          this.owner.mei=claim.given_name;
          this.owner.mail=claim.email;
        } else { 
          this.owner = data.tblowner[0];
          this.flgEx = true;
          for(let i=0;i<data.tblowner[0].tblforms.length;i++){
            // console.log(data.tblowner[0].tblforms[i]);
            // delete data.tblowner[0].tblforms[i]['__typename'];
            // console.log(data.tblowner[0].tblforms[i]);
            let fpat:Fpat = new Fpat(data.tblowner[0].tblforms[i]);
            this.admsrv.fpats.push(fpat);
          }
          for(let i=0;i<data.tblowner[0].tblmaillogs.length;i++){  
            let mail:Mail = new Mail(data.tblowner[0].tblmaillogs[i]);
            this.admsrv.mails.push(mail);
          }
        }
        // console.log('getOwner',this.owner);
        // this.subject.next(this.owner);
    });
  }
}
