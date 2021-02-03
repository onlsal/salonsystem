import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
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
      this.ownsrv.getOwner(this.claim);
    }
  }

  public login():void{
    this.oauthService.revokeTokenAndLogout();
    // this.oauthService.initLoginFlow();
    this.oauthService.initImplicitFlow();
  }

  public toRegist():void{
    // console.log("navi前");
    this.router.navigate(['/regist']);
  }
  public toAdmin():void{
    this.router.navigate(['/admin']);
  } 
}
