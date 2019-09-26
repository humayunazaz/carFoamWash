import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class HomeService {
  packages;
  constructor(private af:AngularFireDatabase) { 
    this.packages = this.af.list('/packages');
  }
  
}
