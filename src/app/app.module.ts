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
import { ToastrModule } from 'ngx-toastr'; 
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
import { DialogComponent } from './dialog/dialog.component';
import { TblfpatComponent } from './tbls/tblfpat.component';
import { ConfirmComponent } from './dialog/confirm.component';
import { QRCodeModule } from 'angular2-qrcode';
import { SendmailComponent } from './dialog/sendmail.component';
import { TblmailComponent } from './tbls/tblmail.component';

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
    TblresComponent,
    DialogComponent,
    TblfpatComponent,
    ConfirmComponent,
    SendmailComponent,
    TblmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    ToastrModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxYubinBangoModule,
    QRCodeModule 
  ],
  entryComponents: [ 
    DialogComponent,
    ConfirmComponent,
    SendmailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
