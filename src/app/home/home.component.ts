import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin:boolean=false
  constructor(
    private firebase : AngularFireDatabase,
    private auth:AngularFireAuth,
    private auth2:AuthService,
    private router:Router
    ) { 
      auth.authState.subscribe(user=>{
        if(user!=null){
          this.isLogin=true;
        }else{
          this.isLogin=false;
        }
      })
    }
  data:Observable<any[]>;

  ngOnInit() {
    this.data = this.firebase.list('product').valueChanges();
    this.data.forEach(element => {
      console.log(element)
      
    });
  }

  logout(){
    this.auth2.logout().subscribe(()=>{
      this.router.navigate['/login']
    })
  }
}
