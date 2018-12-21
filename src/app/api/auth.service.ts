import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth:AngularFireAuth,
    private db:AngularFireDatabase
  ) { }

  login(userData) {
    return new Observable(observable=>{
      this.auth.auth.signInWithEmailAndPassword(userData.email, userData.password)
      .then(user=>{
        observable.next(user);
        observable.complete();
      })
      .catch(err=>{
        observable.error(err.code);
        observable.complete();
      })
    })
  }

  logout(){
    return new Observable(observable=>{
      this.auth.auth.signOut()
      .then(user=>{
        observable.next();
        observable.complete();
      })
      .catch(err=>{
        observable.error(err.code);
        observable.complete();
      })
    })
  }

  register(userData){
    return new Observable(observable=>{
      this.auth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
      .then(user=>{
        this.db.database.ref('user/'+user.user.uid).set({id:user.user.uid, email:user.user.email, uname:userData.name})
        .then((data)=>{
          observable.next(user);
          observable.complete();
        })
        .catch(err=>{
          observable.error(err.code);
          observable.complete();
        })
      })
      .catch(err=>{
        observable.error(err.code);
        observable.complete();
      })
    })
  }
}
