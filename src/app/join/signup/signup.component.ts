import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email:string = "";
  password:string = "";
  first:string = "";
  last:string = "";
  phoneNumber:number = 0;
  city: string = '';
  addressLine: string = '';
  selectedArea:string = '';
  referredBy:string = '';
  signError:boolean = false;
  errorMessage;
  referenceMembers = [];
  constructor(
    private commonService:CommonService,
    private authService:AuthService,
    private af:AngularFireDatabase,
    private router:Router
  ) { 
    
  }
  
  ngOnInit() {
    this.commonService.updatePathUrl('join');
    this.commonService.getReferenceMembers().snapshotChanges().pipe(
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
    ).subscribe((reference:any) => {
      this.referenceMembers = reference;
    });
  }

  onSubmit(form){
    this.authService.registerWithEmail(this.email, this.password).then((success:any) => {
      this.signError = false;
      this.authService.updateUserStatus(success.user.uid);
      
      this.af.object(`/about/${success.user.uid}`).update({
        email: form.value.emailAddress,
        phone: form.value.phone,
        first: form.value.firstName,
        last: form.value.lastName,
        city: form.value.cityName,
        address: form.value.address,
        area: form.value.yourArea,
      }).then(() => {
        if(this.referredBy != ''){
          this.af.list(`/referred/${this.referredBy}`).push(success.user.uid).then(() => {
            this.router.navigate(['/members']);
          });
        } else{
          this.router.navigate(['/members']);
        }
      });
    }).catch((error) => {
      this.signError = true;
      this.errorMessage = error.message;
    }); 
  }

}
