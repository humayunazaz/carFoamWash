import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable()
export class CommonService {
  windowScroll = new BehaviorSubject(1);
  pathUrl = new BehaviorSubject('');
  timeSlotError = new BehaviorSubject('');
  userPlan;
  toastyModal = new BehaviorSubject('');
  interiorLimit$;
  exteriorLimit$;
  paymentUsers$;
  constructor(
    private af:AngularFireDatabase,
    private router:Router
  ) { 
    this.interiorLimit$ = this.af.object(`/timeslots/interiorLimit`);
    this.exteriorLimit$ = this.af.object(`/timeslots/exteriorLimit`);
    this.paymentUsers$ = this.af.list(`/membership/users`, ref => ref.orderByChild('confirm').equalTo(false));
  }


  updateWindowScroll(value){
    this.windowScroll.next(value);
  }

  updatePathUrl(value){
    this.pathUrl.next(value);
  }

  updateMembership(pack, id, amount, car){

    let now = new Date();
    let current;
    if (now.getMonth() == 11) {
      current = new Date(now.getFullYear() + 1, 0, now.getDate());
    } else {
      current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }
    this.af.object(`/membership/users/${id}`).update({plan: pack.key, renewalDate: current.getTime(), wash: pack.wash, usedWash: 0, remainingInterior: pack.interior, remainingExterior: pack.exterior, confirm: false, amount: amount, car: car}).then(() => {
      this.router.navigate(['/members']);
    });
  }

  scheduleWash(id, wash, userPackge, timeSlotLimit){
    return new Promise((resolve, reject) => {
      this.af.object(`/timeslots/${wash.washType}/${wash.date.day}-${wash.date.month}/${wash.time}`).valueChanges().pipe(take(1)).subscribe((selectedTime:any) => {
        if(selectedTime.booking >= timeSlotLimit){
          this.timeSlotError.next('This time slot is already taken, book another!');
          resolve(false);
        } else{
          this.timeSlotError.next('');
          let booking = selectedTime.booking;
          booking = booking + 1;
          this.af.object(`/timeslots/${wash.washType}/${wash.date.day}-${wash.date.month}/${wash.time}`).update({booking: booking}).then(() => {
            this.af.list(`/schedule/wash/date/${wash.date.month}-${wash.date.day}`).push(wash).then((success:any) => {
              this.af.object(`/schedule/wash/users/${id}/${success.key}`).update(wash).then(() => {
                this.updateUserWash(id, userPackge, wash).then(() => {
                  resolve();
                });
              });
            });
          });
        }
      });
    });
  }

  updateUserWash(id, userPackage, wash){
    return new Promise((resolve, reject) => {
      let used = userPackage.usedWash;
      used = used + 1;
      let washType = '';
      let remaining;
      this.af.object(`/membership/users/${id}`).update({usedWash:used});
      if(wash.washType === 'exterior'){
        washType = 'remainingExterior';
        remaining = userPackage.remainingExterior - 1;
        this.af.object(`/membership/users/${id}`).update({remainingExterior:remaining}).then((su) => {
          resolve();
        });
      } else{
        washType = 'remainingInterior';
        remaining = userPackage.remainingInterior - 1;
        this.af.object(`/membership/users/${id}`).update({remainingInterior:remaining}).then((su) => {
          resolve();
        });
      }
    });
  }

  cancelMembership(id, wash, userPackage){
    return new Promise((resolve, reject) => {
      this.af.object(`/schedule/wash/users/${id}/${wash.key}`).remove().then(() => {
        this.af.object(`/schedule/wash/date/${wash.date.month}-${wash.date.day}/${wash.key}`).remove().then(() => {
          let remaining;
          let used = userPackage.usedWash - 1;
          this.af.object(`/membership/users/${id}`).update({usedWash:used});
          this.af.object(`/timeslots/${wash.washType}/${wash.date.day}-${wash.date.month}/${wash.time}`).valueChanges().pipe(take(1)).subscribe((selectedTime:any) => {
            let booking = selectedTime.booking;
            booking = booking - 1;
            this.af.object(`/timeslots/${wash.washType}/${wash.date.day}-${wash.date.month}/${wash.time}`).update({booking: booking}).then(() => {
              if(wash.washType == 'exterior'){
                remaining = userPackage.remainingExterior + 1;
                this.af.object(`/membership/users/${id}`).update({remainingExterior:remaining}).then((su) => {
                  resolve();
                });
              } else{
                remaining = userPackage.remainingInterior + 1;
                this.af.object(`/membership/users/${id}`).update({remainingInterior:remaining}).then((su) => {
                  resolve();
                });
              }
            });
          });
          
        });
      });
      
    });
  }

  getReferenceMembers(){
    return this.af.list('/reference');
  }

  updateToasty(value){
    this.toastyModal.next(value);
  }

  scheduleWashed(type){
    return this.af.list(`/schedule/wash/date/${type}`, ref => ref.orderByChild('status').equalTo('pending'));
  }

  userAbout(id){
    return this.af.object(`/about/${id}`);
  }

  userPackage(id){
    return this.af.object(`/membership/users/${id}`);
  }

  getTimes(type, date){
    return this.af.list(`/timeslots/${type}/${date}`);
  }

}
