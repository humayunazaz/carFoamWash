import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './shared/login/login.component';
import { ConfirmPackageComponent } from './shared/confirm-package/confirm-package.component';
import { ConfirmScheduleComponent } from './shared/confirm-schedule/confirm-schedule.component';
import { CancelScheduleComponent } from './shared/cancel-schedule/cancel-schedule.component';
import {ToastyModule} from "ng2-toasty/index";

const ROUTES: Routes = [
  { path: '', loadChildren: './landing/landing.module#LandingModule' },
  { path: 'join', loadChildren: './join/join.module#JoinModule' },
  { path: 'members', loadChildren: './members/members.module#MembersModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '**', loadChildren: './landing/landing.module#LandingModule' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule.forRoot(),
    AuthModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule.forRoot(),
    ToastyModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    ConfirmPackageComponent,
    ConfirmScheduleComponent,
    CancelScheduleComponent
  ]
})
export class AppModule { }
