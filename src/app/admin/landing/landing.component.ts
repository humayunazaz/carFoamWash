import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  washed:any[] = [];
  noWashed:boolean = false;
  washDate: NgbDateStruct;
  washedDate:NgbDateStruct;
  userPackage = null;
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
  pendingUsers:any[] = [];
  constructor(
    private commonService:CommonService,
    private af: AngularFireDatabase
  ) { }

  ngOnInit() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    this.updateScheduleWash(date);
    this.commonService.interiorLimit$.valueChanges().subscribe((interiorLimit:any) => {
      this.interiorLimit = interiorLimit;
      // console.log(interiorLimit);
    });
    this.commonService.exteriorLimit$.valueChanges().subscribe((exteriorLimit:any) => {
      this.exteriorLimit = exteriorLimit;
      // console.log(this.exteriorLimit);
    });
    this.commonService.paymentUsers$.snapshotChanges().pipe(
      map((actions:any) =>
        actions.map(a => {
            let b;
            // console.log(a.payload.val());
            b = a.payload.val();
            b.key = a.key;
            return b;
          }
        )
      )
    ).subscribe((users) => {
      this.pendingUsers = [];
      users.map((user:any) => {
        this.af.object(`/about/${user.key}`).valueChanges().subscribe((pending:any) =>{
          if(pending != null){
            this.pendingUsers.push(pending);
          }
        });
      });
    });
    
  }

  updateTheDate(){
    let date = new Date(`${this.washedDate.year}-${this.washedDate.month}-${this.washedDate.day}`);
    this.updateScheduleWash(date);
  }

  updateScheduleWash(date){
    this.washed = [];
    this.commonService.scheduleWashed(`${date.getMonth() + 1}-${date.getDate()}`).valueChanges().subscribe((washs) => {
      if(washs.length){
        this.washed = washs;
        this.noWashed = false;
      } else{
        this.noWashed = true;
      }
    });
  }

  updateUserAbout(id){
    this.userId = id;
    this.commonService.userAbout(id).valueChanges().subscribe((about) => {
      if(about != null){
        this.commonService.userPackage(id).valueChanges().subscribe((userPackage) => {
          this.userPackage = userPackage;
          console.log(this.userPackage);
        });
        this.userAbout = about;
      }
    });
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
    this.commonService.getTimes(this.washType, date).valueChanges().subscribe((timeSlots:any) => {
      this.washTimes = timeSlots;
      this.washTimeSet = true;
      // this.updateTimeSlot(this.timeSlotLimit);
    });
  }

  saveTheDate(){
    // this.washTimeSet = false;
    this.updateTimeSlots();
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
        address: this.userAbout.address,
        status: 'pending',
        id: this.userId,
        carType: this.userPackage.car
      }
      console.log(schedule);
      this.commonService.scheduleWash(this.userId, schedule, this.userPackage, this.timeSlotLimit).then(() => {
        console.log('ho gai update');
      }); 
    }
  }
}
