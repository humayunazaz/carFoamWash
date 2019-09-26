import { Component, OnInit } from '@angular/core';
import { CommonService } from './shared/common.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastyConfig } from 'ng2-toasty';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:scroll)' : 'onScroll($event)'
  }
})
export class AppComponent implements OnInit{
  toasty;
  constructor(
    private commonService:CommonService,
    private auth$:AngularFireAuth,
    private authService:AuthService,
    private af:AngularFireDatabase,
    public toastyConfig:ToastyConfig
  ){
    localStorage.removeItem('firebase:previous_websocket_failure');
    // this.toastyConfig.theme = 'bootstrap';
    // this.commonService.updateToasty({class: 'bg-success text-white', message: 'Lun update ho ja'});
  }
  title = 'app';

  onScroll(event){
    this.commonService.updateWindowScroll(window.pageYOffset);
  }

  ngOnInit(){
    this.commonService.toastyModal.subscribe((data) => {
      this.toasty = data;
    });
    // this.renewalFunction();
    // this.auth$.authState.subscribe((data) => {
    //   this.authService.updateUserStatus(data.uid);
    //   console.log(data);
    // })
    let exterior = {
      "09:00AM-10:00AM": {
        slot: '09:00AM-10:00AM',
        booking: 0
      },
      "10:00AM-11:00AM": {
        slot: '10:00AM-11:00AM',
        booking: 0
      },
      "11:00AM-12:00PM": {
        slot: '11:00AM-12:00PM',
        booking: 0
      },
      "12:00PM-01:00PM": {
        slot: '12:00PM-01:00PM',
        booking: 0
      },
      "01:00PM-02:00PM": {
        slot: '01:00PM-02:00PM',
        booking: 0
      },
      "02:00PM-03:00PM": {
        slot: '02:00PM-03:00PM',
        booking: 0
      },
      "03:00PM-04:00PM": {
        slot: '03:00PM-04:00PM',
        booking: 0
      },
      "04:00PM-05:00PM": {
        slot: '04:00PM-05:00PM',
        booking: 0
      },
      "05:00PM-06:00PM": {
        slot: '05:00PM-06:00PM',
        booking: 0
      },
      "06:00PM-07:00PM": {
        slot: '06:00PM-07:00PM',
        booking: 0
      }
    }
    let interior = {
      "09:00AM-10:00AM": {
        slot: '09:00AM-10:00AM',
        booking: 0
      },
      "10:30AM-11:30AM": {
        slot: '10:30AM-11:30AM',
        booking: 0
      },
      "12:00PM-01:00PM": {
        slot: '12:00PM-01:00PM',
        booking: 0
      },
      "01:30PM-02:30PM": {
        slot: '01:30PM-02:30PM',
        booking: 0
      },
      "03:00PM-04:00PM": {
        slot: '03:00PM-04:00PM',
        booking: 0
      },
      "04:30PM-05:30PM": {
        slot: '04:30PM-05:30PM',
        booking: 0
      },
      "06:00PM-07:00PM": {
        slot: '06:00PM-07:00PM',
        booking: 0
      }
    }
    
    // let today = new Date('2019-2-1');
    // // console.log(today);
    // let year = today.getFullYear();
    // let month = today.getMonth();
    // let date = today.getDate();

    // for(let i=0; i<30; i++){
    //       let day = new Date(year, month, date + i);
    //       interior['date'] = day;
    //       this.af.object(`/timeslots/interior/${day.getDate()}-${day.getMonth() + 1}`).set(interior);
    //       exterior['date'] = day;
    //       this.af.object(`/timeslots/exterior/${day.getDate()}-${day.getMonth() + 1}`).set(exterior);
    // }
    
    // this.af.list(`/timeslots/exterior`).valueChanges().subscribe((times:any) => {
    //   times.map(time => {
    //     console.log(time);
    //   });
    // });
    // let ref = [
    //   {
    //     name: 'Wajid Sattar',
    //     value: 'wajidSattar'
    //   },
    //   {
    //     name: 'Fawad Khan',
    //     value: 'fawadKhan'
    //   },
    //   {
    //     name: 'Imran Murtaza',
    //     value: 'imranMurtaza'
    //   },
    //   {
    //     name: 'Naveed Ahmed',
    //     value: 'naveedAhmed'
    //   },
    //   {
    //     name: 'Imran',
    //     value: 'Imran'
    //   }
    // ]
    // ref.map(re => {
    //   this.af.list('/reference').push(re);
    // });

    
  }
  cancelToasty(){
    this.commonService.updateToasty(null);
  }

  renewalFunction(){
    this.af.list('/membership/users').snapshotChanges().pipe(
      map((actions:any) =>
        actions.map(a => {
          let b;
          b = a.payload.val();
          b.$key = a.key;
          return b;
          }
        )
      ),
      take(1)
    ).subscribe(members => {
      let date = new Date();
      console.log(members);
      members.map(member => {
        let renewalDate = new Date(member.renewalDate);
        renewalDate.setDate(renewalDate.getDate() + 1);

        // console.log(renewalDate);
        if(renewalDate.getTime() <= date.getTime() || (member.remainingExterior == 0 && member.remainingInterior == 0)){
          console.log(member);
          if(member.confirm){
            let pack = member;
            let renewal = new Date();
            renewal.setMonth(renewal.getMonth() + 1);
            // console.log(renewal);
            this.af.object(`/packages/${member.plan}`).valueChanges().subscribe((plan:any) =>{
              pack.remainingExterior += plan.exterior; 
              pack.remainingInterior += plan.interior;
              pack.renewalDate = renewal.getTime();
              pack.confirm = false;
              pack.usedWash = 0;
              console.log(pack);
              // delete pack['$key'];
              
              this.af.object(`/membership/users/${member.$key}`).update({
                remainingExterior: pack.remainingExterior,
                remainingInterior: pack.remainingInterior,
                renewalDate: pack.renewalDate,
                confirm: pack.confirm,
                usedWash: pack.usedWash
              });
            });
          } else{
            let renewal = new Date();
            renewal.setMonth(renewal.getMonth() + 1);
            this.af.object(`/membership/users/${member.$key}`).update({renewalDate: renewal.getTime()});
          }
        }
      });
    });
  }
}
