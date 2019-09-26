import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MembersService {
  interiorLimit$;
  exteriorLimit$;
  constructor(private af:AngularFireDatabase) {
    this.interiorLimit$ = this.af.object(`/timeslots/interiorLimit`);
    this.exteriorLimit$ = this.af.object(`/timeslots/exteriorLimit`);
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

  scheduleWash(id){
    return this.af.list(`/schedule/wash/users/${id}`, ref => ref.orderByChild('status').equalTo('pending'));
  }

}
