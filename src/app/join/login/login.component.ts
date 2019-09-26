import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private commonService:CommonService) { }

  ngOnInit() {
    this.commonService.updatePathUrl('join/login');
  }

}
