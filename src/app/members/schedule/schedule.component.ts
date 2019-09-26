import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { CommonService } from '../../shared/common.service';
import { AuthService } from '../../auth/services/auth.service';
import { NgbDateStruct, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmScheduleComponent } from '../../shared/confirm-schedule/confirm-schedule.component';
import { CancelScheduleComponent } from '../../shared/cancel-schedule/cancel-schedule.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  userPackage = null;
  washDate: NgbDateStruct;
  date: {year: number, month: number};
  minDate;
  maxDate;
  interiorLimit;
  exteriorLimit;
  washType;
  washTimes;
  washTimeSet:boolean = false;
  selectedTime;
  timeSlotLimit;
  userAbout;
  errors:boolean = false;
  userId;
  pendingWash = null;
  backGray = false;
  timeError:boolean = false;
  timeErrorMessage:string = '';
  constructor(
    private membershipService:MembersService,
    private commonService:CommonService,
    private authService:AuthService,
    private calendar: NgbCalendar,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.authService.userStatus.subscribe((id) => {
      this.membershipService.userPackage(id).valueChanges().subscribe((userPackage) => {
        this.userId = id;
        if(userPackage != null){
          this.membershipService.scheduleWash(this.userId).snapshotChanges().pipe(
            map((actions:any) =>
              actions.map(a => {
                let b;
                b = a.payload.val();
                b.key = a.key;
                return b;
                }
              )
            )
          ).subscribe((data) => {
            if(data.length){
              data.map((wash:any) => {
                this.pendingWash = wash;
                this.washDate = wash.date;
                this.selectedTime = wash.time;
                this.washType = wash.washType;
              });
            } else{
              this.pendingWash = null;
              this.washDate = null;
              this.selectedTime = null;
              this.washType = null;
            }
          });
          this.membershipService.interiorLimit$.valueChanges().subscribe((interiorLimit:any) => {
            this.interiorLimit = interiorLimit;
            // console.log(interiorLimit);
          });
          this.membershipService.exteriorLimit$.valueChanges().subscribe((exteriorLimit:any) => {
            this.exteriorLimit = exteriorLimit;
            // console.log(this.exteriorLimit);
          });
          this.userPackage = userPackage;
          let current = new Date();
          // console.log(current);
          let end = new Date(this.userPackage.renewalDate);
          this.minDate = {day: current.getUTCDate() + 1, month: current.getUTCMonth() + 1, year: current.getUTCFullYear()};
          this.maxDate = {day: end.getUTCDate(), month: end.getUTCMonth() + 1, year: end.getUTCFullYear()};
          this.membershipService.userAbout(id).valueChanges().subscribe((about:any) => {
            this.userAbout = about;
          });
          this.commonService.timeSlotError.subscribe((data) => {
            if(data != ''){
              this.timeError = true;
              this.timeErrorMessage = data;
            } else{
              this.timeError = false;
              this.timeErrorMessage = '';
            }
          });
        }
      });
    })
    
  }

  // updateTimeSlot(limit){
  //   console.log(limit);
  //   console.log(this.selectedTime);
  //   if(this.selectedTime != undefined){
  //     console.log(this.selectedTime.booking);
  //     if(limit === this.selectedTime.booking){
  //       this.selectedTime = null;
  //     }
  //   }
  // }

  saveTheDate(){
    // this.washTimeSet = false;
    this.updateTimeSlots();
    this.errors = false;
  }

  updateWashType(event){
    // this.washTimeSet = false;
    this.errors = false;
    this.washType = event;
    if(event == 'exterior'){
      this.timeSlotLimit = this.exteriorLimit;
    } else{
      this.timeSlotLimit = this.interiorLimit;
    }
    if(this.washDate != undefined){
      this.updateTimeSlots();
    }
  }

  updateTimeSlots(){
    let date = `${this.washDate.day}-${this.washDate.month}`;
    this.membershipService.getTimes(this.washType, date).valueChanges().subscribe((timeSlots:any) => {
      this.washTimes = timeSlots;
      this.washTimeSet = true;
      // this.updateTimeSlot(this.timeSlotLimit);
    });
  }

  scheduleWash(){
    if(this.washDate != undefined && this.washType != undefined && this.selectedTime != undefined){
      // console.log(this.selectedTime.booking);
      this.errors = false;
      let schedule = {
        washType: this.washType,
        date: this.washDate,
        time: this.selectedTime,
        contact: this.userAbout.phone,
        address: this.userAbout.address
      }
      const confirm = this.modalService.open(ConfirmScheduleComponent);
      confirm.componentInstance.userId = this.userId;
      confirm.componentInstance.userPackage = this.userPackage;
      confirm.componentInstance.washSchedule = schedule;
      confirm.componentInstance.timeSlotLimit = this.timeSlotLimit;
    } else{
      this.errors = true;
    }
  }

  cancelWash(){
    const cancelModel = this.modalService.open(CancelScheduleComponent);
    cancelModel.componentInstance.id = this.userId;
    cancelModel.componentInstance.wash = this.pendingWash;
    cancelModel.componentInstance.userPackage = this.userPackage;
  }

}
