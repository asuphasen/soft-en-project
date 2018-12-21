import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin=false;
  constructor(private firebase:AngularFireAuth){
    if(firebase.auth.currentUser!=null){
      firebase.authState.subscribe(user=>{
        if(user!=null){
          this.isLogin=true;
        }
      })
    }
  }

  title = 'soft3';

  logOut(){
    this.firebase.auth.signOut();
  }
}
