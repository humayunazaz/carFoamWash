import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeroComponent } from './hero/hero.component';
import { ServicesComponent } from './services/services.component';
import { UsersComponent } from './users/users.component';
import { PackagesComponent } from './packages/packages.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { OwlModule } from 'ngx-owl-carousel';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CountoModule }  from 'angular2-counto';
import { CommonService } from '../shared/common.service';

const ROUTES: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    OwlModule,
    NgbModule.forRoot(),
    CountoModule
  ],
  declarations: [HeroComponent, ServicesComponent, UsersComponent, TestimonialsComponent, HomeComponent, ContactComponent],
})
export class LandingModule { }
