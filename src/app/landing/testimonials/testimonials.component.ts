import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  show:boolean = false;
  constructor(private commonService:CommonService) { }
  products:any[] = [
    {
      path: './assets/img/maguiars.jpeg'
    },
    {
      path: './assets/img/armorAll.jpeg'
    },
    {
      path: './assets/img/sonax.jpg'
    },
    {
      path: './assets/img/turtleWax.jpg'
    },
    {
      path: './assets/img/flamingo.jpg'
    },
    {
      path: './assets/img/3m.jpeg'
    }
  ]
  ngOnInit() {
    
  }

}
