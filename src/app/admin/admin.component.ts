import { Component, OnInit } from '@angular/core';
import { GoogleDriveProvider } from '../prvs/googledrive';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  providers: [ GoogleDriveProvider ]
})
export class AdminComponent implements OnInit {

  constructor(public gDrive: GoogleDriveProvider) { }

  ngOnInit(): void {
  }
  readGdrive(){
    let fileId = '/1oyfyrhxl4vLGG2TGS1Yai9ltfyd3Mwg-YxFe3DRns-U';
    let sheetId = '/od6';
    this.gDrive.load( fileId ,sheetId)
    .then( ( data :any) => {
      console.log(data);
    }, (error) => {
      console.log( error );
    });
  }
}
