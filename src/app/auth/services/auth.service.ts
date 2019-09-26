import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database/database';



@Injectable()
export class AuthService {
  authState$: Observable<any>;
  user;
  userStatus = new BehaviorSubject('');
  constructor(
    public auth$: AngularFireAuth,
    private app: FirebaseApp,
    private af: AngularFireDatabase
  ) { 
    this.authState$ = auth$.authState;
    this.authState$.subscribe(user => {
      if(user != null){
        this.user = user;
        this.updateUserStatus(user.uid);
      } else{
        this.updateUserStatus(null);
        this.user = null;
      }
    });

    // auth$.authState.subscribe((user) => {
    //   if (user) {
    //     this.user = user;
    //     // this.authObservable.next(this.user);
    //   }
    //   // this.authObservable.next(this.user);
    // });
  }

  registerWithEmail(email, password) {
    return this.auth$.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut(){
    this.updateUserStatus(null);
    this.auth$.auth.signOut();
  }

  updateUserStatus(value){
    this.userStatus.next(value);
  }

  signInWithEmail(email, password): Promise<any> {
    return this.auth$.auth.signInWithEmailAndPassword(email, password);
  }

  updatePassword(email, oldPassword, newPassword){
    return new Promise((resolve, reject) => {
      this.auth$.auth.signInWithEmailAndPassword(email, oldPassword).then((success) => {
        this.auth$.auth.currentUser.updatePassword(newPassword).then((success) => {
          resolve();
        });
      });
    });
  }

}
