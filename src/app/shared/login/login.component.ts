import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  showSignIn = false;
  errorMessage = '';
  constructor(private authService:AuthService, private router:Router, public activeModal:NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.authService.signInWithEmail(form.value.email, form.value.password).then((success:any) => {
      if(success.user != null){
        this.activeModal.dismiss();
        this.router.navigate(['/members']);
      }
    }).catch((error:any) => {
      this.errorMessage = error.message;
    });
  }

  gotoJoin(){
    this.activeModal.dismiss();
    this.router.navigate(['/join']);
  }

}
