import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  members: number = 0;
  users:number = 0;
  cars:number = 0;
  weekCars:number = 0;
  totalMembers = 100;
  totalUsers = 100;
  totalCars = 100;
  totalCarsWeek = 200;
  show:boolean = false;
  constructor(private commonService:CommonService) { }

  ngOnInit() {
    // this.setNumber(500, 'members');
    this.commonService.windowScroll.subscribe((data) => {
      if(data >= 950){
        this.show = true;
      }
    })
  }


}
