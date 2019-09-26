import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from './common.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PackagesComponent } from '../landing/packages/packages.component';
import { ConfirmPackageComponent } from './confirm-package/confirm-package.component';
import { NgbModule, NgbDatepicker, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmScheduleComponent } from './confirm-schedule/confirm-schedule.component';
import { CancelScheduleComponent } from './cancel-schedule/cancel-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [LoginComponent, PackagesComponent, ConfirmPackageComponent, ConfirmScheduleComponent, CancelScheduleComponent],
  providers: [],
  exports: [LoginComponent, PackagesComponent, ConfirmPackageComponent, ConfirmScheduleComponent, CancelScheduleComponent]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        CommonService
      ]
    };
  }
}
