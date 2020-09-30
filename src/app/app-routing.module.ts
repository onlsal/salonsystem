import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RegistComponent } from './regist/regist.component';
import { AuthGuard } from './auth.guard';
import { RegistGuard } from './regist.guard';

const routes: Routes = [ 
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'regist', component: RegistComponent, canActivate: [RegistGuard]},
  // redirectTo は'/home'にすると情報を取得できなくなるので注意
  {path: '**', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
