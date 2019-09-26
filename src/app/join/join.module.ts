import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {Routes, RouterModule} from "@angular/router";
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const ROUTES: Routes = [
  { path: '', component: SignupComponent },
]


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [SignupComponent, LoginComponent]
})
export class JoinModule { }
