import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor() { }
  items:any[] = [
    {
      lable: 'Exterior Foaming',
      img: './assets/img/carFoam.png'
    },
    {
      lable: 'Exterior Wash',
      img: './assets/img/carWash.png'
    },
    {
      lable: 'Wheel Cleaning',
      img: './assets/img/wheelCleaning.png'
    },
    {
      lable: 'Glass Cleaning',
      img: './assets/img/glassCleaning.png'
    },
    {
      lable: 'Dashboard Detailing',
      img: './assets/img/InteriorDetailing.png'
    },
    {
      lable: 'Seat Detailing',
      img: './assets/img/seatsDetailing.png'
    },
    {
      lable: 'Carpet Detailing',
      img: './assets/img/carpetCleaing.png'
    },
    {
      lable: 'Engine Detailing',
      img: './assets/img/engineDetailing.png'
    },
    {
      lable: 'Wax & Polish',
      img: './assets/img/carPolish.png'
    }
  ]
  ngOnInit() {
  }

}
