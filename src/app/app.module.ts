import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { RegistComponent } from './regist/regist.component';
import { HomeComponent } from './home/home.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { NgxYubinBangoModule } from 'ngx-yubinbango';
import { TblformComponent } from './tbls/tblform.component';
import { TblcalComponent } from './tbls/tblcal.component';
import { TblmemComponent } from './tbls/tblmem.component';
import { TblpayComponent } from './tbls/tblpay.component';
import { TblresComponent } from './tbls/tblres.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RegistComponent,
    HomeComponent,
    TblformComponent,
    TblcalComponent,
    TblmemComponent,
    TblpayComponent,
    TblresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxYubinBangoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
