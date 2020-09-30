import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Apollo } from 'apollo-angular';
import * as Query from '../queries';
import { OwnerService } from '../srvs/owner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public email:string="";
  public claim:any;
  constructor(private oauthService: OAuthService,
              private router: Router,
              private apollo: Apollo,
              public ownsrv: OwnerService ) { }

  ngOnInit(): void {
    this.oauthInit();
  }

  // 初期処理
  private async oauthInit() {
    this.oauthService.setStorage(localStorage);
    await this.oauthService.setupAutomaticSilentRefresh();
  // この非同期処理を行わないとユーザー情報が取得できない
    await this.oauthService.loadDiscoveryDocument()
    .then(() => this.oauthService.tryLogin());
    this.claim = this.oauthService.getIdentityClaims();
    if (this.claim != null){
      this.email=this.claim.email;
      // console.log("init",this.claim);
      this.apollo.watchQuery<any>({
        query: Query.GetQuery1,
        variables: { 
            gid:this.claim.sub
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          if (data.tblowner.length==0){
            this.ownsrv.owner.googleid=this.claim.sub;
            this.ownsrv.owner.sei=this.claim.family_name;
            this.ownsrv.owner.mei=this.claim.given_name;
            this.ownsrv.owner.mail=this.claim.email;
          } else { 
            this.ownsrv.owner = data.tblowner[0];
            this.ownsrv.owner.flgEx=true;
          }
        });
    }
  }

  public login():void{
    this.oauthService.revokeTokenAndLogout();
    this.oauthService.initLoginFlow();
  }

  public toRegist():void{
    console.log("navi前");
    this.router.navigate(['/regist']);
  }
  public toAdmin():void{
    this.router.navigate(['/admin']);
  } 
}
