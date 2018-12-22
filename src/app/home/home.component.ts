import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { User } from 'firebase';

interface modalStruct {
  url: string
  productName: string
  address:string
  detail: string
  price: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild('modal') modalRef:ElementRef;
  isLogin: boolean = false;

  datas: modalStruct;
  username: string;

  private inputurl: string;
  private inputname: string;
  private inputdetail: string;
  inputaddress: string;
  private inputprice: string;

  constructor(
    private firebase: AngularFireDatabase,
    private auth: AngularFireAuth,
    private auth2: AuthService,
    private router: Router,
    private render:Renderer
  ) {
    auth.authState.subscribe(user => {
      if (user != null) {
        console.log(user.uid)
        this.isLogin = true;
        // auth2.getname().once('value',name=>{
        //   console.log(name.val())
        // })
        this.auth2.getname(user.uid).once('value',user=>{
          console.log(user.val())
          this.username = user.val();
        })
      } else {
        this.isLogin = false;
      }
    })
  }
  data: Observable<any[]>;
  usern: Observable<any[]>;
 
  ngOnInit() {
    this.data = this.firebase.list('product').valueChanges();
    this.data.forEach(element => {

    });

    this.usern =this.auth2.getusername();
    this.username= this.usern[2];
    this.usern.forEach(n =>{
      console.log(n)
    })
    console.log(this.username + "5555555555++++++12")
  }

  logout() {
    this.auth2.logout().subscribe(() => {
      this.router.navigate['/login']
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
