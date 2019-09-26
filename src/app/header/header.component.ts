import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../shared/login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeMenu = 'home';
  fixed:boolean = false;
  currentPath = '';
  authenticated:boolean = false;
  showMenu:boolean;
  constructor(
    private commonService:CommonService,
    private router:Router,
    private route:ActivatedRoute,
    private authService:AuthService,
    private modelService:NgbModal
  ) { }
  mainHeads = [
    {
      title: 'Home',
      value: 'home',
      route: ''
    },
    {
      title: 'Services',
      value: 'services',
      route: ''
    },
    {
      title: 'Packages',
      value: 'packages',
      route: ''
    },
    {
      title: 'Contact',
      value: 'contact',
      route: ''
    },
    {
      title: 'Products',
      value: 'products',
      route: ''
    }
  ]
  ngOnInit() {
    this.commonService.windowScroll.subscribe((scroll) => {
      if(window.pageYOffset >= 50){
        this.fixed = true;
      } else{
        this.fixed = false;
      }
    });
    this.commonService.pathUrl.subscribe((url) => {
      this.currentPath = url;
    }); 
    this.authService.userStatus.subscribe(data => {
      if(data != null){
        this.authenticated = true;
      } else{
        this.authenticated = false;
      }
    })
  }

  slideTo(head){
    let el = head.value;
    this.activeMenu = head.value;
    if(this.currentPath == '' && head.route == ''){
      // console.log('lun');
      $('html, body').animate({
        scrollTop: $("#" + el).offset().top
      }, 2000);
    } else{
      this.router.navigate([head.route]);
    }
    if(window.innerWidth < 568){
      $('.navbar-collapse').removeClass("show");
    }
  }

  logOut(){
    this.authService.signOut();
    this.router.navigate(['/']);
    if(window.innerWidth < 568){
      $('.navbar-collapse').removeClass("show");
    }
  }

  login(){
    this.modelService.open(LoginComponent);
    if(window.innerWidth < 568){
      $('.navbar-collapse').removeClass("show");
    }
  }

  routeTo(route){
    this.router.navigate([route]);
    if(window.innerWidth < 568){
      $('.navbar-collapse').removeClass("show");
    }
  }

}
