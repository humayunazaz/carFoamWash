import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth-guard.guard';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { MembersService } from './services/members.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { HomeComponent } from './home/home.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

const ROUTES: Routes = [
  { path: '', 
    component: LandingComponent, 
    canActivate:[AuthGuard],
    children: [
      { path: '', component: HomeComponent},
      { path: 'settings', component: SettingsComponent}
    ]
  },
  
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    FormsModule,
    NgbDatepickerModule,
  ],
  declarations: [LandingComponent, SettingsComponent, ScheduleComponent, HomeComponent],
  providers: [MembersService]
})
export class MembersModule { }
