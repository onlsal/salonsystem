import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService,Fpat } from '../srvs/admin.service';
import { OwnerService } from '../srvs/owner.service';
import { Apollo } from 'apollo-angular';
import * as Query from '../queries';

@Component({
  selector: 'app-tblfpat',
  templateUrl: './tblfpat.component.html',
  styleUrls: ['./tbl.component.scss']
})
export class TblfpatComponent implements OnInit {
  @Output() action = new EventEmitter();
  displayedColumns = ['name','memo','url','act1'];
  dataSource = new MatTableDataSource<Fpat>(this.admsrv.fpats);

  constructor(public admsrv:AdminService,
              public ownsrv:OwnerService,
              private apollo: Apollo) { }

  ngOnInit(): void {
    this.admsrv.observe.subscribe(() => this.refresh());
  }

  insertRow(): void {
    console.log(this.admsrv.fpats);
    let fpat:Fpat = new Fpat();
    fpat.dojoid = this.ownsrv.owner.dojoid; 
    if(this.admsrv.fpats.length==0){
      fpat.pattern = 1;
    } else { 
      fpat.pattern = Math.max.apply(null,this.admsrv.fpats.map(function(o){return o.pattern;})) + 1;
    }   
    fpat.name = 'パターン' + fpat.pattern;
    fpat.memo = '';
    fpat.url= '';
    this.admsrv.fpats.push(fpat);
    this.admsrv.subject.next();
  }
  
  updateRow(i: number, property: string, value: string): void {
    // console.log(property,value);
    this.admsrv.fpats[i][property] = value;

    this.admsrv.subject.next();
    this.delinsTblform();
  }

  deleteRow(i:number): void {
    this.admsrv.fpats.splice(i,1);
    this.delinsTblform();    
  }

  delinsTblform(): void{
    this.apollo.mutate<any>({
      mutation: Query.DeleteForms,
      variables: {
        did: this.ownsrv.owner.dojoid
      },
    }).subscribe(({ data }) => {
      this.apollo.mutate<any>({
        mutation: Query.InsertForms,
        variables: {
          "objects": this.admsrv.fpats
        },
      }).subscribe(({ data }) => {
        this.refresh();
      },(error) => {
        console.log('error InsertForms', error);
      });
    },(error) => {
      console.log('error DeleteTblForm', error);
    });     
  }
  refresh(): void {
    this.dataSource = new MatTableDataSource<Fpat>(this.admsrv.fpats);
    // console.log(this.admsrv.fpats);
  }
}
