import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomeService } from '../service/home.service';
import { AuthService } from '../../auth/services/auth.service';
import { map } from 'rxjs/operators';
import { CommonService } from '../../shared/common.service';
import { Plan } from './userPlan';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPackageComponent } from '../../shared/confirm-package/confirm-package.component';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packages;
  authenticated:boolean = false;
  id;
  userPlan = new Plan();
  planSet:boolean = false;
  @Input() backGray:boolean = false;
  @Input() heading = 'PACKAGES WE OFFER';
  constructor(
    private af:AngularFireDatabase, 
    private authService:AuthService, 
    private commonService:CommonService,
    private modalService:NgbModal,
    private router:Router,
    private toastyService:ToastyService
  ) { }

  ngOnInit() {
    // console.log(this.userPlan);
    this.authService.userStatus.subscribe((data:any) => {
      if(data != null && data != ''){
        this.authenticated = true;
        this.id = data;
        // console.log(this.id);
        this.getUserPlan(this.id);
      } else{
        this.authenticated = false;
        this.id = null;
        this.planSet = true;
      }
    })
    // this.af.object('/packages').set(this.packs);
    this.af.list('/packages').snapshotChanges().pipe(
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
    ).subscribe((packages:any) => {
      this.packages = packages;
    });

  }

  updateSub(pack){
    let now = new Date();
    let current;

    if (now.getMonth() == 11) {
      current = new Date(now.getFullYear() + 1, 0, now.getDate());
    } else {
      current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }
    // console.log(pack);
    // this.commonService.updateMembership(pack, this.id);
    const confirm = this.modalService.open(ConfirmPackageComponent);
    confirm.componentInstance.selectedPackage = pack;
    confirm.componentInstance.renewalDate = current;
    confirm.componentInstance.id = this.id;
  }

  getUserPlan(id){
    // console.log(id);
    this.af.object(`/membership/users/${id}`).valueChanges().subscribe((data:any) => {
      if(data != null){
        this.userPlan = data;
      }
      this.planSet = true;
    }); 
  }

  gotoJoin(){
    this.router.navigate(['/join']);
  }

}
