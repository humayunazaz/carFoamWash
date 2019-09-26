import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {

  constructor() { 
  }
  heroContent = [
    {
      label: 'maintaining your car fast, safe and affordable'
    },
    {
      label: 'make your car shine'
    },
    {
      label: 'making your car look as good as new'
    }
  ]
  ngOnInit() {
  }
  @ViewChild('owlElement') owlElement: OwlCarousel


   fun() {
     this.owlElement.next([200])
     //duration 200ms
   }
}
