import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) {
    auth.authState.subscribe(user => {
      if (user != null) {
        this.isLogin = true;
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
    const newdata = {
      detail: item.detail,
      oid: this.auth2.getname().uid,
      price: item.price,
      productName: item.productName,
      address: this.inputaddress,
      url: item.url
    }

    this.auth2.additems(newdata);

  }
}
