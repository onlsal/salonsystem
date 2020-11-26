import { Component, OnInit } from '@angular/core';
import { GoogleDriveProvider } from '../prvs/googledrive';
import { OwnerService } from '../srvs/owner.service';

class Mst {
  dojoid:number;
  folder:string;
  spread:string;
  form0:string;
  form1:string;
  form2:string;
  constructor(init?:Partial<Mst>) {
      Object.assign(this, init);
  }
}

class Cal {
  dojoid:number;
  calid:string;
  name:string;
  constructor(init?:Partial<Cal>) {
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

  public ids:Mst[]  =[];
  public cals:Cal[] =[];
  public link1:string;
  constructor(public gDrive: GoogleDriveProvider,
              public ownsrv: OwnerService ) { }

  ngOnInit(): void {
    this.readGdrive();

    
  }


  readGdrive():void {

    let fileId = '/1oyfyrhxl4vLGG2TGS1Yai9ltfyd3Mwg-YxFe3DRns-U';
    this.gDrive.load( fileId ,'/od6')
    .then( ( data :any) => {
      this.ids = data;
      console.log(this.ids,this.ownsrv.owner.dojoid);
      let dojo:Mst = this.ids.find(e => e.dojoid == this.ownsrv.owner.dojoid);
      console.log(dojo);
      this.link1="https://docs.google.com/forms/d/" + dojo.form0 + "/viewform";
    }, (error) => {
      console.log( error );
    });
    this.gDrive.load( fileId ,'/oe1ilbc')
    .then( ( data :any) => {
      this.cals = data;
    }, (error) => {
      console.log( error );
    });
  }
}
