import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const ROUTES: Routes = [
  { path: '', 
    component: LandingComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    CommonModule,
    NgbDatepickerModule,
    FormsModule
  ],
  declarations: [LandingComponent]
})
export class AdminModule { }
