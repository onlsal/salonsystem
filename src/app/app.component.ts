import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Online Salon System';
  constructor(private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
  }

  private async configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    // console.log(this.oauthService);
    // awaitとしないとユーザーの情報が取得できない。
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
