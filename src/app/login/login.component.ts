import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(
    private auth:AuthService,
    private route:Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.auth.login({email:this.email, password:this.password}).subscribe(data =>{
      console.log(this.auth.getname().uid)
      this.route.navigate(['/home'])
    }, err=>{
      console.log(err)
    })
  }
}
