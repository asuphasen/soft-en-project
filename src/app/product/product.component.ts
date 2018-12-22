import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AuthService } from '../api/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { element } from '@angular/core/src/render3';

interface modalStruct {
  url: string
  productName: string
  address:string
  detail: string
  price: string
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modal') modalRef:ElementRef;
  isLogin:boolean=false
  username: string;
  datas: modalStruct;
  inputaddress: string;

  constructor(
    private firebase : AngularFireDatabase,
    private auth2: AuthService,
    private auth:AngularFireAuth,
    private render:Renderer
    ) { 
      auth.authState.subscribe(user => {
        if (user != null) {
          this.isLogin = true;
          this.auth2.getname(user.uid).once('value',user=>{
            this.username = user.val();
          })
        } else {
          this.isLogin = false;
        }
      })
    }
  data:Observable<any[]>;

  ngOnInit() {
    // this.firebase.list('/product',ref=>ref.orderByChild('oid').equalTo("0Krx4LnVJ7cYO58jgxpiGLyDuC93")).valueChanges().subscribe(data=>{
      
    //   console.log(data);
    // })
    this.auth.authState.subscribe(data2=>{
      console.log(data2.uid)
      this.data = this.firebase.list('/product',ref=>ref.orderByChild('oid').equalTo(data2.uid.toString())).valueChanges();
      console.log(this.data);
      this.data.forEach(element => {
        console.log(element);
      });
    })
    
  }

  getdetail(data) {
    this.datas = data;
    this.inputaddress = data.address;
  }

  additem(item) {
    this.auth.authState.subscribe(user=>{
      if(user!=null){
        const newdata = {
          detail: item.detail,
          oid: user.uid,
          price: item.price,
          productName: item.productName,
          address: this.inputaddress,
          url: item.url
        }
        console.log(this.modalRef)
        this.auth2.additems(newdata);
        this.render.setElementStyle(this.modalRef,'display','none')
      }
    })
  }
}
