import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AuthService } from '../api/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isLogin:boolean=false
  constructor(
    private firebase : AngularFireDatabase,
    private auth:AngularFireAuth
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
    // this.firebase.list('/product',ref=>ref.orderByChild('oid').equalTo("0Krx4LnVJ7cYO58jgxpiGLyDuC93")).valueChanges().subscribe(data=>{
      
    //   console.log(data);
    // })
    this.data = this.firebase.list('/product',ref=>ref.orderByChild('oid').equalTo("0Krx4LnVJ7cYO58jgxpiGLyDuC93")).valueChanges();
    console.log(this.data);
    this.data.forEach(element => {
      console.log(element);
    });
  }
}
