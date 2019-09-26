import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../common.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-confirm-schedule',
  templateUrl: './confirm-schedule.component.html',
  styleUrls: ['./confirm-schedule.component.css']
})
export class ConfirmScheduleComponent implements OnInit {
  @Input() washSchedule;
  @Input() userId;
  @Input() userPackage;
  @Input() timeSlotLimit;
  constructor(
    private commonService:CommonService,
    private activeModal:NgbActiveModal,
    private toastyService:ToastyService
  ) { }

  ngOnInit() {
   
  }

  confirm(){
    this.washSchedule['id'] = this.userId;
    this.washSchedule['carType'] = this.userPackage.car;
    this.washSchedule['status'] = 'pending';
    // console.log(this.washSchedule);
    this.commonService.scheduleWash(this.userId, this.washSchedule, this.userPackage, this.timeSlotLimit).then(() => {
      this.commonService.updateToasty({class: 'bg-success text-white', message: 'Your car wash is successfully schedule.'});
      this.activeModal.dismiss();
    });
  }

}
