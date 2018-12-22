import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { stringify } from '@angular/core/src/render3/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userdata: firebase.User;
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private route: Router
  ) { }

  login(userData) {
    return new Observable(observable => {
      this.auth.auth.signInWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          this.userdata = user.user;
          observable.next(user);
          observable.complete();
        })
        .catch(err => {
          observable.error(err.code);
          observable.complete();
        })
    })
  }

  getusername() {
    return this.db.list('user/' + this.userdata.uid).valueChanges();
  }

  getname(uid) {
    return this.db.database.ref('user/'+uid+'/uname')
    
    // console.log("in auth function")
    // console.log(this.userdata)
    // return this.userdata;
  }

  logout() {
    return new Observable(observable => {
      this.auth.auth.signOut()
        .then(user => {
          observable.next();
          observable.complete();
        })
        .catch(err => {
          observable.error(err.code);
          observable.complete();
        })
    })
  }

  data: Observable<any[]>;
  count: number;
  additems(item) {
    this.count = 0;
    this.data = this.db.list('product').valueChanges();
    this.data.forEach(element => {
      this.count++;
    });
    console.log(this.count + "555555555555555555555555")
    this.db.database.ref('product').push(item);
  }

  register(userData) {
    return new Observable(observable => {
      this.auth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          this.db.database.ref('user/' + user.user.uid).set({ id: user.user.uid, address: userData.address, email: user.user.email, uname: userData.name })
            .then((data) => {
              observable.next(user);
              observable.complete();
              this.route.navigate(['/home'])
            })
            .catch(err => {
              observable.error(err.code);
              observable.complete();
            })
        })
        .catch(err => {
          observable.error(err.code);
          observable.complete();
        })
    })
  }
}
