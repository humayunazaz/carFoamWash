import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { AuthService } from '../../auth/services/auth.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  about = new about();
  id;
  currentPassword;
  newPassword;
  backGray = false; 
  constructor(
    private memberService:MembersService,
    private authService:AuthService,
    private commonService:CommonService
    
  ) { }

  ngOnInit() {
    this.authService.userStatus.subscribe((id) => {
      this.id = id;
      this.memberService.userAbout(id).valueChanges().subscribe((userAbout:any) => {
        if(userAbout != null){
          this.about = userAbout;
          console.log(this.about);
        }
      });
    });
  }

  onSubmit(form){
    this.memberService.userAbout(this.id).update(this.about).then(() => {
      this.commonService.updateToasty({class: 'bg-success text-white', message: 'Your contact details are successfully updated.'});
    });
  }

  updatePassword(form){
    this.authService.updatePassword(this.about.email, form.value.pass, form.value.newPass).then(() => {
      this.currentPassword = '';
      this.newPassword = '';
      this.commonService.updateToasty({class: 'bg-success text-white', message: 'Your password successfully updated.'});
    });
  }
}

export class about{
  first:string = "";
  last:string = "";
  phone:string = "";
  city: string = '';
  address: string = '';
  email: string = '';
  area: string = '';
}